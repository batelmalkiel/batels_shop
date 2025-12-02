import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'אימייל לא תקין' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'הסיסמה חייבת להכיל לפחות 6 תווים' })
  @MaxLength(50, { message: 'הסיסמה ארוכה מדי' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'שם פרטי חייב להכיל לפחות 2 תווים' })
  @MaxLength(50, { message: 'שם פרטי ארוך מדי' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'שם משפחה חייב להכיל לפחות 2 תווים' })
  @MaxLength(50, { message: 'שם משפחה ארוך מדי' })
  lastName: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{2,4}-[0-9]{7}$/, { message: 'מספר טלפון לא תקין (פורמט: 050-1234567)' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'כתובת ארוכה מדי' })
  address?: string;
}