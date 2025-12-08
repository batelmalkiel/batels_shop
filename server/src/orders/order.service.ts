/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from './order.entity';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private productsService: ProductsService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    // בדיקת זמינות מלאי וחישוב מחיר כולל
    let totalAmount = 0;
    const orderItems: Partial<OrderItem>[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.productId);

      if (product.stock < item.quantity) {
        throw new BadRequestException(`אין מספיק מלאי עבור ${product.name}`);
      }

      const itemTotal = Number(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        engravingText: item.engravingText,
        ringSize: item.ringSize,
      });

      // עדכון מלאי
      await this.productsService.updateStock(
        product.id,
        product.stock - item.quantity,
      );
    }

    // יצירת ההזמנה
    const order = this.ordersRepository.create({
      userId,
      totalAmount,
      shippingAddress: createOrderDto.shippingAddress,
      notes: createOrderDto.notes,
      giftWrap: createOrderDto.giftWrap || false,
      giftMessage: createOrderDto.giftMessage,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // יצירת פריטי ההזמנה
    const items = orderItems.map((item) =>
      this.orderItemsRepository.create({
        ...item,
        orderId: savedOrder.id,
      }),
    );

    await this.orderItemsRepository.save(items);

    return this.findOne(savedOrder.id);
  }

  async findAll(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });

    if (!order) {
      throw new NotFoundException('הזמנה לא נמצאה');
    }

    return order;
  }

  async updateStatus(
    id: number,
    status: OrderStatus,
    userId?: number,
  ): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('הזמנה לא נמצאה');
    }

    if (userId && order.userId !== userId) {
      throw new BadRequestException('אין לך הרשאה לעדכן הזמנה זו');
    }

    order.status = status;
    await this.ordersRepository.save(order);

    return this.findOne(id);
  }

  async cancelOrder(id: number, userId: number): Promise<Order> {
    const order = await this.findOne(id);

    if (order.userId !== userId) {
      throw new BadRequestException('אין לך הרשאה לבטל הזמנה זו');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('לא ניתן לבטל הזמנה שכבר בטיפול');
    }

    return this.updateStatus(id, OrderStatus.CANCELLED, userId);
  }

  //Admin
  async findAllAdmin(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }
}
