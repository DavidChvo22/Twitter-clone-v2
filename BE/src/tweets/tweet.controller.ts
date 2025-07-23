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
import { TweetService } from './tweet.service';
import { Tweet } from './schemas/tweet.schema';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/auth/authenticated-request.interface';

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
    @Request() req: AuthenticatedRequest,
  ): Promise<Tweet> {
    return await this.tweetService.create(body.content, req.user.userId);
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
