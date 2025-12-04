import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: User; token: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('משתמש עם אימייל זה כבר קיים');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
      provider: 'local',
    });

    await this.usersRepository.save(user);

    const token = this.generateToken(user);

    return { user, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email }
    });

    if (!user || user.provider !== 'local') {
      throw new UnauthorizedException('אימייל או סיסמה שגויים');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('אימייל או סיסמה שגויים');
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async googleLogin(profile: any): Promise<{ user: User; token: string }> {
    let user = await this.usersRepository.findOne({
      where: { googleId: profile.id }
    });

    if (!user) {
      console.log('Google profile:', profile);

      user = await this.usersRepository.findOne({
        where: { email: profile.emails[0].value }
      });

      if (user) {
        user.googleId = profile.id;
        user.provider = 'google';
        await this.usersRepository.save(user);
      } else {
        user = this.usersRepository.create({
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          googleId: profile.id,
          provider: 'google',
          profilePicture: profile.photos?.[0]?.value
        });
        await this.usersRepository.save(user);
      }
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
