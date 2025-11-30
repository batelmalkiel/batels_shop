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
  category: string; // טבעות אירוסין, שרשראות, עגילים, צמידים

  @Column({
    type: 'enum',
    enum: MetalType,
  })
  metalType: MetalType;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  metalWeight: number; // גרמים

  @Column({
    type: 'enum',
    enum: StoneType,
    default: StoneType.NONE,
  })
  stoneType: StoneType;

  @Column('decimal', { precision: 6, scale: 2, nullable: true })
  stoneCarat: number; // קראט

  @Column({ nullable: true })
  stoneClarity: string; // VVS, VS, SI

  @Column({ nullable: true })
  stoneColor: string; // D, E, F, G

  @Column()
  imageUrl: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isCustomMade: boolean;

  @Column({ nullable: true })
  collection: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
