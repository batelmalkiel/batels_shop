"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductsService = class ProductsService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async findAll(filters = {}) {
        const { category, metalType, stoneType, minPrice, maxPrice, search, collection, sortBy = 'createdAt', sortOrder = 'DESC', page = 1, limit = 20, } = filters;
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
            }
            else if (minPrice !== undefined) {
                query.andWhere('product.price >= :minPrice', { minPrice });
            }
            else if (maxPrice !== undefined) {
                query.andWhere('product.price <= :maxPrice', { maxPrice });
            }
        }
        if (search) {
            query.andWhere('(product.name ILIKE :search OR product.description ILIKE :search)', { search: `%${search}%` });
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
    async findOne(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException('מוצר לא נמצא');
        }
        return product;
    }
    async getCategories() {
        const result = await this.productsRepository
            .createQueryBuilder('product')
            .select('DISTINCT product.category', 'category')
            .where('product.isActive = :isActive', { isActive: true })
            .getRawMany();
        return result.map((r) => r.category);
    }
    async getCollections() {
        const result = await this.productsRepository
            .createQueryBuilder('product')
            .select('DISTINCT product.collection', 'collection')
            .where('product.isActive = :isActive AND product.collection IS NOT NULL', { isActive: true })
            .getRawMany();
        return result.map((r) => r.collection);
    }
    async getMetalTypes() {
        const result = await this.productsRepository
            .createQueryBuilder('product')
            .select('DISTINCT product.metalType', 'metalType')
            .where('product.isActive = :isActive', { isActive: true })
            .getRawMany();
        return result.map((r) => r.metalType);
    }
    async updateStock(id, quantity) {
        const product = await this.findOne(id);
        product.stock = quantity;
        return this.productsRepository.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map