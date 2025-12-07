import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsArray } from 'class-validator';
import { MetalType, StoneType } from '../product.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsEnum(MetalType)
  metalType: MetalType;

  @IsOptional()
  @IsNumber()
  metalWeight?: number;

  @IsEnum(StoneType)
  @IsOptional()
  stoneType?: StoneType;

  @IsOptional()
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
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsBoolean()
  isCustomMade?: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
