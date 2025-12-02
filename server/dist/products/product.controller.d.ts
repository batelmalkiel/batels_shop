import * as productsService_1 from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: productsService_1.ProductsService);
    findAll(filters: productsService_1.ProductFilters): Promise<{
        products: import("./product.entity").Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getCategories(): Promise<{
        categories: string[];
    }>;
    getCollections(): Promise<{
        collections: string[];
    }>;
    getMetalTypes(): Promise<{
        metalTypes: import("./product.entity").MetalType[];
    }>;
    findOne(id: number): Promise<import("./product.entity").Product>;
}
