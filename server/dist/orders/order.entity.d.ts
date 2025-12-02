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
    user: User;
    userId: number;
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
    order: Order;
    orderId: number;
    product: Product;
    productId: number;
    quantity: number;
    priceAtPurchase: number;
    engravingText: string;
    ringSize: string;
    createdAt: Date;
}
