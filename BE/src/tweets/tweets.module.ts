import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tweet, TweetSchema } from './tweet.schema';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
