import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrácia nového používateľa' })
  @ApiResponse({ status: 201, description: 'Používateľ bol úspešne zaregistrovaný' })
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Prihlásenie používateľa' })
  @ApiResponse({ status: 200, description: 'Používateľ bol úspešne prihlásený' })
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
