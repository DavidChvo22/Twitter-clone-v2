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
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from './schemas/tweet.schema';
import { AuthGuard } from '@nestjs/passport';
import { AuthReq } from '../auth/auth-req.interface';

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
    @Body() body: { content: string },
    @Request() req: AuthReq,
  ): Promise<Tweet> {
    return await this.tweetService.create(body.content, req.user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const deleted = await this.tweetService.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
  }
}
