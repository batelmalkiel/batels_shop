import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.entity';
import { User } from '../users/user.entity';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(user: User, createOrderDto: CreateOrderDto): Promise<{
        message: string;
        order: import("./order.entity").Order;
    }>;
    findAll(user: User): Promise<{
        orders: import("./order.entity").Order[];
    }>;
    findOne(id: number, user: User): Promise<{
        order: import("./order.entity").Order;
    }>;
    updateStatus(id: number, status: OrderStatus, user: User): Promise<{
        message: string;
        order: import("./order.entity").Order;
    }>;
    cancel(id: number, user: User): Promise<{
        message: string;
        order: import("./order.entity").Order;
    }>;
}
