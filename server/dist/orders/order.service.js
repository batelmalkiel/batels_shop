"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    ordersRepository;
    orderItemsRepository;
    productsService;
    constructor(ordersRepository, orderItemsRepository, productsService) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.productsService = productsService;
    }
    async create(userId, createOrderDto) {
        let totalAmount = 0;
        const orderItems = [];
        for (const item of createOrderDto.items) {
            const product = await this.productsService.findOne(item.productId);
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`אין מספיק מלאי עבור ${product.name}`);
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
            await this.productsService.updateStock(product.id, product.stock - item.quantity);
        }
        const order = this.ordersRepository.create({
            userId,
            totalAmount,
            shippingAddress: createOrderDto.shippingAddress,
            notes: createOrderDto.notes,
            giftWrap: createOrderDto.giftWrap || false,
            giftMessage: createOrderDto.giftMessage,
            status: order_entity_1.OrderStatus.PENDING,
        });
        const savedOrder = await this.ordersRepository.save(order);
        const items = orderItems.map((item) => this.orderItemsRepository.create({
            ...item,
            orderId: savedOrder.id,
        }));
        await this.orderItemsRepository.save(items);
        return this.findOne(savedOrder.id);
    }
    async findAll(userId) {
        return this.ordersRepository.find({
            where: { userId },
            relations: ['items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['items', 'items.product', 'user'],
        });
        if (!order) {
            throw new common_1.NotFoundException('הזמנה לא נמצאה');
        }
        return order;
    }
    async updateStatus(id, status, userId) {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) {
            throw new common_1.NotFoundException('הזמנה לא נמצאה');
        }
        if (userId && order.userId !== userId) {
            throw new common_1.BadRequestException('אין לך הרשאה לעדכן הזמנה זו');
        }
        order.status = status;
        await this.ordersRepository.save(order);
        return this.findOne(id);
    }
    async cancelOrder(id, userId) {
        const order = await this.findOne(id);
        if (order.userId !== userId) {
            throw new common_1.BadRequestException('אין לך הרשאה לבטל הזמנה זו');
        }
        if (order.status !== order_entity_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('לא ניתן לבטל הזמנה שכבר בטיפול');
        }
        return this.updateStatus(id, order_entity_1.OrderStatus.CANCELLED, userId);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=order.service.js.map