import api from './api';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    profilePicture?: string;
  };
  token: string;
  message: string;
}

class AuthService {
  // הרשמה
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  // כניסה
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  // כניסה עם Google
  googleLogin(): void {
    window.location.href = `http://localhost:3001/auth/google`;
  }

  // טיפול בהחזרה מ-Google (callback)
  async handleGoogleCallback(token: string): Promise<AuthResponse> {
    this.saveToken(token);
    const response = await this.getProfile();
    return response;
  }

  // קבלת פרופיל משתמש
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  }

  // התנתקות
  logout(): void {
    localStorage.removeItem('token');
  }

  // שמירת Token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // קבלת Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // בדיקה אם מחובר
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();