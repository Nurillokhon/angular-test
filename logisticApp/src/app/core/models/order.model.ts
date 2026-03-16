export interface Order {
  id: number;
  from: string;
  to: string;
  weight: number;
  price: number;
  status: 'ACTIVE' | 'MODERATION' | 'NEW';
  senderId: number;
  createdAt: string;
}
export interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}
