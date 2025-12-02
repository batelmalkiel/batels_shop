import { Controller, Get, Param, Query } from '@nestjs/common';
import * as productsService_1 from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: productsService_1.ProductsService) {}

  @Get()
  async findAll(@Query() filters: productsService_1.ProductFilters) {
    return this.productsService.findAll(filters);
  }

  @Get('categories')
  async getCategories() {
    const categories = await this.productsService.getCategories();
    return { categories };
  }

  @Get('collections')
  async getCollections() {
    const collections = await this.productsService.getCollections();
    return { collections };
  }

  @Get('metal-types')
  async getMetalTypes() {
    const metalTypes = await this.productsService.getMetalTypes();
    return { metalTypes };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }
}
