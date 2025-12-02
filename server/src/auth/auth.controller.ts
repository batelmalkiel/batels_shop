// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      message: 'הרשמה בוצעה בהצלחה',
      user: result.user,
      token: result.token
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      message: 'התחברת בהצלחה',
      user: result.user,
      token: result.token
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // מפעיל את תהליך ההזדהות של Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: express.Response) {
    const result = await this.authService.googleLogin(req.user);
    
    // מפנה חזרה לאפליקציה עם הטוקן
    res.redirect(`http://localhost:3000/auth/callback?token=${result.token}`);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return {
      user
    };
  }
}