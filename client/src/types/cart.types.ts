export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  metalType?: string;
  stoneType?: string;
}