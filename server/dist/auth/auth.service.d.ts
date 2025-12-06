import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: User;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: User;
        token: string;
    }>;
    googleLogin(profile: any): Promise<{
        user: User;
        token: string;
    }>;
    validateUser(userId: number): Promise<User | null>;
    private generateToken;
}
