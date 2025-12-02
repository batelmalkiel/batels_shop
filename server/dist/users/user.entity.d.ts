import { Order } from '../orders/order.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    provider: string;
    googleId: string;
    profilePicture: string;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
