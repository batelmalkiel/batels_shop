import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  /** FK user_id */
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  /** FIXED: DB column is total_amount, not totalAmount */
  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'total_amount',
    default: 0,
  })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  /** shipping_address already correct */
  @Column({ name: 'shipping_address' })
  shippingAddress: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ name: 'gift_wrap', default: false })
  giftWrap: boolean;

  @Column({ name: 'gift_message', nullable: true })
  giftMessage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'price_at_purchase',
  })
  priceAtPurchase: number;

  @Column({ name: 'engraving_text', nullable: true })
  engravingText: string;

  @Column({ name: 'ring_size', nullable: true })
  ringSize: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
