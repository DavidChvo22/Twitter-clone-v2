import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './Interfaces/item.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTweet(): Item[] {
    return this.appService.findAll();
  }

  @Post()
  create(@Body() itemData: { content: string }): Item {
    return this.appService.create(itemData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    const deleted = this.appService.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
  }
}
