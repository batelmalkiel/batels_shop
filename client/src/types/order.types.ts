import { Product } from './product.types';
import { User } from './user.types';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  priceAtPurchase: number;
  engravingText?: string;
  ringSize?: string;
  createdAt: string;
}

export interface Order {
  id: number;
  userId: number;
  user?: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  notes?: string;
  giftWrap: boolean;
  giftMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
  engravingText?: string;
  ringSize?: string;
}

export interface CreateOrderData {
  items: CreateOrderItem[];
  shippingAddress: string;
  notes?: string;
  giftWrap?: boolean;
  giftMessage?: string;
}

export interface OrderResponse {
  order: Order;
  message: string;
}