import { 
  IsString, 
  IsNotEmpty, 
  IsEnum, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsArray 
} from 'class-validator';
import { MetalType, StoneType } from '../../products/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsEnum(MetalType)
  metalType: MetalType;

  @IsNumber()
  @IsOptional()
  metalWeight?: number;

  @IsEnum(StoneType)
  @IsOptional()
  stoneType?: StoneType;

  @IsNumber()
  @IsOptional()
  stoneCarat?: number;

  @IsString()
  @IsOptional()
  stoneClarity?: string;

  @IsString()
  @IsOptional()
  stoneColor?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isCustomMade?: boolean;

  @IsString()
  @IsOptional()
  collection?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
