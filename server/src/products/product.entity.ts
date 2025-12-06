import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MetalType {
  GOLD = 'gold',
  WHITE_GOLD = 'white_gold',
  ROSE_GOLD = 'rose_gold',
  SILVER = 'silver',
  PLATINUM = 'platinum',
  TITANIUM = 'titanium',
}

export enum StoneType {
  DIAMOND = 'diamond',
  RUBY = 'ruby',
  SAPPHIRE = 'sapphire',
  EMERALD = 'emerald',
  PEARL = 'pearl',
  TOPAZ = 'topaz',
  AMETHYST = 'amethyst',
  AQUAMARINE = 'aquamarine',
  NONE = 'none',
}
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @Column({
    name: 'metal_type',
    type: 'enum',
    enum: MetalType,
  })
  metalType: MetalType;

  @Column('decimal', {
    name: 'metal_weight',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  metalWeight: number;

  @Column({
    name: 'stone_type',
    type: 'enum',
    enum: StoneType,
    default: StoneType.NONE,
  })
  stoneType: StoneType;

  @Column('decimal', {
    name: 'stone_carat',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  stoneCarat: number;

  @Column({ name: 'stone_clarity', nullable: true })
  stoneClarity: string;

  @Column({ name: 'stone_color', nullable: true })
  stoneColor: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'stock', default: 0 })
  stock: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_custom_made', default: false })
  isCustomMade: boolean;

  @Column({ nullable: true })
  collection: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
