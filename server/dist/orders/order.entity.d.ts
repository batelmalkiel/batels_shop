import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: number;
    userId: number;
    user: User;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: string;
    notes: string;
    giftWrap: boolean;
    giftMessage: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OrderItem {
    id: number;
    orderId: number;
    order: Order;
    productId: number;
    product: Product;
    quantity: number;
    priceAtPurchase: number;
    engravingText: string;
    ringSize: string;
    createdAt: Date;
}
