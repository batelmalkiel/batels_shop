import {
  Controller, Get, Param, Query, Post, Body, Put, Delete,
  UseGuards, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import cloudinary from '../cloudinary/cloudinary.config';
import { v2 as cloudinaryV2 } from 'cloudinary';
import * as productsService_1 from './products.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: productsService_1.ProductsService) {}

  //Normal user endpoints
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

  //Admin only endpoints
    
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() productDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const result = await cloudinaryV2.uploader.upload(file.path, {
        folder: 'products',
      });
      productDto.imageUrl = result.secure_url;
    }
    return this.productsService.create(productDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: number, @Body() productDto: UpdateProductDto,
   @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const result = await cloudinaryV2.uploader.upload(file.path, {
        folder: 'products',
      });
      productDto.imageUrl = result.secure_url;
    }
    return this.productsService.update(id, productDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
