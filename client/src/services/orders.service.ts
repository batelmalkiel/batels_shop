import api from './api';
import { Order, CreateOrderData, OrderResponse } from '../types/order.types';

class OrdersService {
  // יצירת הזמנה חדשה
  async create(data: CreateOrderData): Promise<OrderResponse> {
    const response = await api.post<OrderResponse>('/orders', data);
    return response.data;
  }

  //Admin
  // קבלת כל ההזמנות
  async getAllAdmin(): Promise<Order[]> {
    const response = await api.get<{ orders: Order[] }>('/orders/admin');
    return response.data.orders;
  }

  // קבלת כל ההזמנות של המשתמש
  async getAll(): Promise<Order[]> {
    const response = await api.get<{ orders: Order[] }>('/orders');
    return response.data.orders;
  }

  // קבלת הזמנה בודדת
  async getOne(id: number): Promise<Order> {
    const response = await api.get<{ order: Order }>(`/orders/${id}`);
    return response.data.order;
  }

  // עדכון סטטוס הזמנה
  async updateStatus(id: number, status: string): Promise<Order> {
    const response = await api.patch<{ order: Order }>(
      `/orders/${id}/status`, 
      { status }
    );
    return response.data.order;
  }

  // ביטול הזמנה
  async cancel(id: number): Promise<Order> {
    const response = await api.patch<{ order: Order }>(`/orders/${id}/cancel`);
    return response.data.order;
  }


  
}

export default new OrdersService();