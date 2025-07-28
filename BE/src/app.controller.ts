import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  healthCheck() {
    return {
      success: true,
      message: 'API works',
    };
  }
}
