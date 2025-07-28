import { Module } from '@nestjs/common';

import { ConfigModule } from './infrastructure/config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule, DatabaseModule, TweetsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
