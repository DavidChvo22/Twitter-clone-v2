import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UsersService } from 'src/users/users.service';
import { RegisterUserDto, RegisterUserResponseDto } from './dto/register-user.dto';
import { LoginUserDto, LoginUserResponseDto, UserInfoDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const existing = await this.usersService.findOne(registerDto.username);
    if (existing) {
      throw new BadRequestException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create(registerDto.username, hashedPassword);

    const payload = { username: user.username, sub: user._id };
    const access_token = this.jwtService.sign(payload);

    const userResponse = plainToInstance(UserInfoDto, {
      id: user._id,
      username: user.username,
    });

    return {
      access_token,
      user: userResponse,
    };
  }

  async login(loginDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.usersService.findOne(loginDto.username);
    if (!user) {
      throw new BadRequestException('Username or password incorrect');
    }

    const valid = await bcrypt.compare(loginDto.password, user.password);
    if (!valid) {
      throw new BadRequestException('Username or password incorrect');
    }

    const payload = { username: user.username, sub: user._id };
    const access_token = this.jwtService.sign(payload);

    const userResponse = plainToInstance(UserInfoDto, {
      id: user._id,
      username: user.username,
    });

    return {
      access_token,
      user: userResponse,
    };
  }
}
