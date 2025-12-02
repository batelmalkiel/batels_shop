import express from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: User;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: User;
        token: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: express.Response): Promise<void>;
    getProfile(user: User): Promise<{
        user: User;
    }>;
}
