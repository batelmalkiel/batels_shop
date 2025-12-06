import { Repository } from 'typeorm';
import { Product, MetalType, StoneType } from './product.entity';
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
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(filters?: ProductFilters): Promise<{
        products: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<Product>;
    getCategories(): Promise<string[]>;
    getCollections(): Promise<string[]>;
    getMetalTypes(): Promise<MetalType[]>;
    updateStock(id: number, quantity: number): Promise<Product>;
}
