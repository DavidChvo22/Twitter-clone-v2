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
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('tweets')
@ApiTags('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  @ApiOperation({ summary: 'Získať všetky tweety' })
  @ApiResponse({ status: 200, description: 'Zoznam tweetov', type: [Tweet] })
  async getTweets(): Promise<Tweet[]> {
    return this.tweetsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Vytvoriť nový tweet' })
  @ApiResponse({ status: 201, description: 'Tweet bol úspešne vytvorený', type: Tweet })
  async create(
    @Body() createTweetDto: CreateTweetDto,
    @CurrentUser() user: { userId: string; username: string },
  ): Promise<Tweet> {
    return await this.tweetsService.create(createTweetDto, user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Vymazať tweet' })
  @ApiResponse({ status: 204, description: 'Tweet bol úspešne vymazaný' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; username: string },
  ): Promise<void> {
    return await this.tweetsService.delete(id, user.userId);
  }
}
