import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { MetalType, StoneType } from '../product.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsEnum(MetalType)
  metalType: MetalType;

  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  @IsNumber()
  metalWeight?: number;

  @IsEnum(StoneType)
  @IsOptional()
  stoneType?: StoneType;

  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  @IsNumber()
  stoneCarat?: number;

  @IsOptional()
  @IsString()
  stoneClarity?: string;

  @IsOptional()
  @IsString()
  stoneColor?: string;

  @IsOptional()
  @IsString()
  collection?: string;

  @IsOptional()
  @Transform(({ value, obj }) => {
    
    // Check if tags[] exists (array format from FormData)
    if (obj['tags[]']) {
      const tagsArray = obj['tags[]'];
      // Delete the tags[] key so it doesn't interfere
      delete obj['tags[]'];
      return Array.isArray(tagsArray) ? tagsArray : [tagsArray];
    }
    
    // Handle undefined, null, empty string
    if (!value || value === '' || value === 'undefined' || value === 'null' || value === '[]') {
      return [];
    }
    
    // Already an array
    if (Array.isArray(value)) {
      return value;
    }
    
    // String value
    if (typeof value === 'string') {
      // Try to parse as JSON array first (for strings like '["tag1","tag2"]')
      if (value.startsWith('[')) {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [value];
        } catch {
          // Not valid JSON, treat as single tag
          return [value];
        }
      }
      // Single string tag - convert to array
      return [value];
    }
    
    // Fallback
    return [];
  })
  @IsArray()
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value, 10) : 0)
  @IsNumber()
  stock?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return false;
  })
  @IsBoolean()
  isCustomMade?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return true; // Default to true if not specified
  })
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}