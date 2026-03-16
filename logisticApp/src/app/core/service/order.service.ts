import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  api = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getOrders(page = 1, limit = 10) {
    return this.http.get<OrdersResponse>(`${this.api}/orders?page=${page}&limit=${limit}`);
  }

  getOrder(id: number) {
    return this.http.get(`${this.api}/orders/${id}`);
  }

  createOrder(data: any) {
    return this.http.post(`${this.api}/orders`, data);
  }

  changeStatus(id: number, status: string) {
    return this.http.patch(`${this.api}/orders/${id}/status`, {
      status,
    });
  }
}
