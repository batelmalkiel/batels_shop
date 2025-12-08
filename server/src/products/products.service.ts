/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, MetalType, StoneType } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface ProductFilters {
  category?: string;
  metalType?: MetalType;
  stoneType?: StoneType;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  collection?: string;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(filters: ProductFilters = {}) {
    const {
      category,
      metalType,
      stoneType,
      minPrice,
      maxPrice,
      search,
      collection,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 20,
    } = filters;

    const query = this.productsRepository.createQueryBuilder('product');

    query.where('product.isActive = :isActive', { isActive: true });

    if (category) {
      query.andWhere('product.category = :category', { category });
    }

    if (metalType) {
      query.andWhere('product.metalType = :metalType', { metalType });
    }

    if (stoneType) {
      query.andWhere('product.stoneType = :stoneType', { stoneType });
    }

    if (collection) {
      query.andWhere('product.collection = :collection', { collection });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      if (minPrice !== undefined && maxPrice !== undefined) {
        query.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        });
      } else if (minPrice !== undefined) {
        query.andWhere('product.price >= :minPrice', { minPrice });
      } else if (maxPrice !== undefined) {
        query.andWhere('product.price <= :maxPrice', { maxPrice });
      }
    }

    if (search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    query.orderBy(`product.${sortBy}`, sortOrder);

    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [products, total] = await query.getManyAndCount();

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('מוצר לא נמצא');
    }

    return product;
  }

  async getCategories(): Promise<string[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.isActive = :isActive', { isActive: true })
      .getRawMany();

    return result.map((r) => r.category);
  }

  async getCollections(): Promise<string[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.collection', 'collection')
      .where(
        'product.isActive = :isActive AND product.collection IS NOT NULL',
        { isActive: true },
      )
      .getRawMany();

    return result.map((r) => r.collection);
  }

  async getMetalTypes(): Promise<MetalType[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.metalType', 'metalType')
      .where('product.isActive = :isActive', { isActive: true })
      .getRawMany();

    return result.map((r) => r.metalType);
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock = quantity;
    return this.productsRepository.save(product);
  }

  //Admin CRUD
  async create(productDto: CreateProductDto): Promise<Product> {
  const product = this.productsRepository.create(productDto);
  return this.productsRepository.save(product);
  }

async update(id: number, productDto: UpdateProductDto): Promise<Product> {
  const product = await this.findOne(id);
  Object.assign(product, productDto);
  return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return { message: 'המוצר נמחק בהצלחה' };
  }
}
