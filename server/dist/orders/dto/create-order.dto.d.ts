export declare class CreateOrderItemDto {
    productId: number;
    quantity: number;
    engravingText?: string;
    ringSize?: string;
}
export declare class CreateOrderDto {
    items: CreateOrderItemDto[];
    shippingAddress: string;
    notes?: string;
    giftWrap?: boolean;
    giftMessage?: string;
}
