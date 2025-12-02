export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  provider: 'local' | 'google';
  googleId?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}