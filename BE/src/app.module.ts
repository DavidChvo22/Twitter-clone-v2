import { Module } from '@nestjs/common';

import { ConfigModule } from './infrastructure/config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TweetModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule, DatabaseModule, TweetModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
