import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tweet, TweetSchema } from './tweet.schema';
import { TweetController } from './tweets.controller';
import { TweetService } from './tweets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
