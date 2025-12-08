import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  // Global Validation Pipe - אוטומטית מוודא את כל ה-DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // מסיר properties שלא מוגדרות ב-DTO
      forbidNonWhitelisted: false, // זורק שגיאה אם יש properties לא מוגדרות
      transform: true, // הופך אוטומטית strings למספרים וכו'
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );
  
  await app.listen(3001);
  console.log('💎 Jewelry Shop API is running on http://localhost:3001');
}
bootstrap();