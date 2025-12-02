import { IsArray, IsString, IsNumber, IsBoolean, IsOptional, ValidateNested, Min, MaxLength, ArrayMinSize }
 from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsNumber({}, { message: 'מזהה מוצר חייב להיות מספר' })
  @Min(1, { message: 'מזהה מוצר לא תקין' })
  productId: number;

  @IsNumber({}, { message: 'כמות חייבת להיות מספר' })
  @Min(1, { message: 'כמות חייבת להיות לפחות 1' })
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'טקסט חריטה ארוך מדי (מקסימום 100 תווים)' })
  engravingText?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'מידת טבעת לא תקינה' })
  ringSize?: string;
}

export class CreateOrderDto {
  @IsArray({ message: 'פריטים חייבים להיות מערך' })
  @ArrayMinSize(1, { message: 'ההזמנה חייבת לכלול לפחות פריט אחד' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsString({ message: 'כתובת משלוח חייבת להיות טקסט' })
  @MaxLength(500, { message: 'כתובת משלוח ארוכה מדי' })
  shippingAddress: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'הערות ארוכות מדי' })
  notes?: string;

  @IsOptional()
  @IsBoolean({ message: 'אריזת מתנה חייבת להיות true/false' })
  giftWrap?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'הודעת מתנה ארוכה מדי' })
  giftMessage?: string;
}