export enum MetalType {
  GOLD = 'gold',
  WHITE_GOLD = 'white_gold',
  ROSE_GOLD = 'rose_gold',
  SILVER = 'silver',
  PLATINUM = 'platinum',
  TITANIUM = 'titanium'
}

export enum StoneType {
  DIAMOND = 'diamond',
  RUBY = 'ruby',
  SAPPHIRE = 'sapphire',
  EMERALD = 'emerald',
  PEARL = 'pearl',
  TOPAZ = 'topaz',
  AMETHYST = 'amethyst',
  AQUAMARINE = 'aquamarine',
  NONE = 'none'
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  metalType: MetalType;
  metalWeight?: number;
  stoneType: StoneType;
  stoneCarat?: number;
  stoneClarity?: string;
  stoneColor?: string;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  isCustomMade: boolean;
  collection?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  metalType?: MetalType;
  stoneType?: StoneType;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  collection?: string;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}