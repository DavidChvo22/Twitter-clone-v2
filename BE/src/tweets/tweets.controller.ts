import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Tweet } from './tweet.schema';
import { TweetService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('tweets')
@ApiTags('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  @ApiOperation({ summary: 'Získať všetky tweety' })
  @ApiResponse({ status: 200, description: 'Zoznam tweetov' })
  async getTweets(): Promise<Tweet[]> {
    return this.tweetService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Vytvoriť nový tweet' })
  @ApiResponse({ status: 201, description: 'Tweet bol úspešne vytvorený' })
  async create(
    @Body() createTweetDto: CreateTweetDto,
    @CurrentUser() user: { userId: string; username: string },
  ): Promise<Tweet> {
    return await this.tweetService.create(createTweetDto, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Vymazať tweet' })
  @ApiResponse({ status: 204, description: 'Tweet bol úspešne vymazaný' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; username: string },
  ): Promise<void> {
    return await this.tweetService.delete(id, user.userId);
  }
}
