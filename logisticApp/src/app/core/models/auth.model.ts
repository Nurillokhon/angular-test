export interface LoginRequest {
  phone: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}
export interface User {
  id: number;
  name: string;
  phone: string;
  role: UserRole;
}
export enum UserRole {
  SENDER = 'sender',
  CARRIER = 'carrier',
  MODERATOR = 'moderator',
}
