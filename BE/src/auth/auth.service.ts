import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existing = await this.usersService.findOne(registerDto.username);
      if (existing) throw new Error('Username already taken');

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      await this.usersService.create(registerDto.username, hashedPassword);

      return { message: 'User created successfully' };
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        console.error('Caught an unexpected error type:', e);
        throw new BadRequestException('An unexpected error occured');
      }
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findOne(loginDto.username);
      if (!user) throw new Error('Username or password incorrect');

      const valid = await bcrypt.compare(loginDto.password, user.password);
      if (!valid) throw new Error('Username or password incorrect');

      const payload = { username: user.username, sub: user._id };
      const access_token = this.jwtService.sign(payload);

      const userResponse = plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: false,
      });

      return new LoginResponseDto(access_token, userResponse);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        console.error('Caught an unexpected error type:', e);
        throw new BadRequestException('An unexpected error occured');
      }
    }
  }
}
