/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { JwtAuthStrategy } from './strategies/jwt.strategy';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import { RolesGuard } from './guards/roles.guard';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(
          'JWT_SECRET',
          'your-secret-key-change-in-production',
        ),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, GoogleAuthStrategy, RolesGuard, AdminGuard],
  exports: [AuthService],
})
export class AuthModule {}
