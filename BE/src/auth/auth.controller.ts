import { Controller, Post, Body, BadRequestException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    try {
      return await this.authService.register(body.username, body.password);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        console.error('Caught an unexpected error type:', e);
        throw new BadRequestException('An unexpected error occured');
      }
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      return await this.authService.login(body.username, body.password);
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
