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
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthenticatedRequest } from 'src/auth/authenticated-request.interface';
import { Tweet } from './tweet.schema';
import { TweetService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  async getTweet(): Promise<Tweet[]> {
    return this.tweetService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createTweetDto: CreateTweetDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<Tweet> {
    return await this.tweetService.create(createTweetDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    const result = await this.tweetService.delete(id, req.user.userId);

    if (result === 'not_found') {
      throw new NotFoundException(`Tweet with ID ${id} not found.`);
    }
    if (result === 'forbidden') {
      throw new ForbiddenException('Nemáte oprávnenie vymazať tento tweet.');
    }
  }
}
