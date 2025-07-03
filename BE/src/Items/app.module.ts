import { Module } from '@nestjs/common';
import { TweetModule } from './Tweet/tweet.module';

@Module({
  imports: [TweetModule],
})
export class AppModule {}
