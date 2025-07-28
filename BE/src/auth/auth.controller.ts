import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserResponseDto } from './dto/register-user.dto';
import { LoginUserDto, LoginUserResponseDto } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrácia nového používateľa' })
  @ApiResponse({ status: 201, description: 'Používateľ bol úspešne zaregistrovaný', type: RegisterUserResponseDto })
  async register(@Body() body: RegisterUserDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Prihlásenie používateľa' })
  @ApiResponse({ status: 200, description: 'Používateľ bol úspešne prihlásený', type: LoginUserResponseDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }
}
