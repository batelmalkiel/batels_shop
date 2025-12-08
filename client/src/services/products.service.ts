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

  //Admin methods
  private buildFormData(productData: any): FormData {
    const formData = new FormData();

    for (const key in productData) {
      if (productData[key] !== undefined && productData[key] !== null) {
        const value = productData[key];

        if (key === 'image' && value instanceof File) {
          // Ensure the key is 'image' for FileInterceptor
          formData.append('image', value);
        } else if (Array.isArray(value)) {
          // For arrays, append each item separately with the same key
          // This is how multipart/form-data handles arrays
          if (value.length === 0) {
            // Send empty array as empty string or skip it
            formData.append(key, '[]');
          } else {
            value.forEach((item) => {
              formData.append(`${key}[]`, String(item));
            });
          }
        } else {
          formData.append(key, String(value));
        }
      }
    }

    return formData;
  }

  async create(productData: any): Promise<Product> {
    const formData = this.buildFormData(productData);
    
    const response = await api.post<Product>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }

  async update(id: number, productData: any): Promise<Product> {
    const formData = this.buildFormData(productData);

    const response = await api.put<Product>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export default new ProductsService();