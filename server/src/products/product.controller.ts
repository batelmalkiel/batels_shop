import {
  Controller, Get, Param, Query, Post, Body, Put, Delete,
  UseGuards, UploadedFile, UseInterceptors, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import '../cloudinary/cloudinary.config'; // Import to execute the config
import { v2 as cloudinaryV2 } from 'cloudinary';
import * as productsService_1 from './products.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: productsService_1.ProductsService) {}

  // Helper method to upload buffer to Cloudinary
  private async uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      // Convert buffer to base64 data URI
      const base64Data = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            
      cloudinaryV2.uploader.upload(
        base64Data,
        { 
          folder: 'products',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else if (!result) {
            console.error('❌ Cloudinary returned no result');
            reject(new Error('Upload failed - no result'));
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });
  }

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() productDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        if (!file.buffer) {
          throw new BadRequestException('File buffer is missing');
        }
        
        const imageUrl = await this.uploadToCloudinary(file);
        productDto.imageUrl = imageUrl;
      }

      const result = await this.productsService.create(productDto);
      return result;
    } catch (error) {
      console.error('❌ Error in create method:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        if (!file.buffer) {
          throw new BadRequestException('File buffer is missing');
        }
        
        const imageUrl = await this.uploadToCloudinary(file);
        productDto.imageUrl = imageUrl;
      }

      const result = await this.productsService.update(id, productDto);
      return result;
    } catch (error) {
      console.error('❌ Error in update method:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productsService.unActive(id);
  }
}