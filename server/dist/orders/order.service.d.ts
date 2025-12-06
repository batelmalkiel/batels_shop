import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from './order.entity';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    private productsService;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>, productsService: ProductsService);
    create(userId: number, createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(userId: number): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    updateStatus(id: number, status: OrderStatus, userId?: number): Promise<Order>;
    cancelOrder(id: number, userId: number): Promise<Order>;
}
