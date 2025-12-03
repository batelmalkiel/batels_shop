import api from './api';
import { Product, ProductFilters, ProductsResponse } from '../types/product.types';

class ProductsService {
  // קבלת כל המוצרים עם פילטרים
  async getAll(filters?: ProductFilters): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/products', { 
      params: filters 
    });
    return response.data;
  }

  // קבלת מוצר בודד
  async getOne(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }

  // קבלת קטגוריות
  async getCategories(): Promise<string[]> {
    const response = await api.get<{ categories: string[] }>('/products/categories');
    return response.data.categories;
  }

  // קבלת קולקציות
  async getCollections(): Promise<string[]> {
    const response = await api.get<{ collections: string[] }>('/products/collections');
    return response.data.collections;
  }

  // קבלת סוגי מתכות
  async getMetalTypes(): Promise<string[]> {
    const response = await api.get<{ metalTypes: string[] }>('/products/metal-types');
    return response.data.metalTypes;
  }
}

export default new ProductsService();