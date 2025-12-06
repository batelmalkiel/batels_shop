// src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'אימייל לא תקין' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'הסיסמה חייבת להכיל לפחות 6 תווים' })
  password: string;
}