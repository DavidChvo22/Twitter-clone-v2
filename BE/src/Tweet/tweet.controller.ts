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
import { TweetService } from './tweet.service';
import { Item } from './interfaces/item.interface';

@Controller()
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  getTweet(): Item[] {
    return this.tweetService.findAll();
  }

  @Post()
  create(@Body() itemData: { content: string }): Item {
    return this.tweetService.create(itemData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    const deleted = this.tweetService.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
  }
}
