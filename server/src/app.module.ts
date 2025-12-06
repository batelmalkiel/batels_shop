import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { ProductsModule } from './products/product.module';
import { OrdersModule } from './orders/order.module';

@Module({
  imports: [
    // Config Module - גלובלי
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM Database Connection
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', '1234'),
        database: config.get('DB_NAME', 'postgres'),
        schema: 'shop',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // ⚠️ רק לפיתוח! בפרודקשן להשתמש במיגרציות
        logging: false,
      }),
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}