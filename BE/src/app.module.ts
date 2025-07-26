import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TweetModule } from './tweets/tweet.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TweetModule,
    MongooseModule.forRoot('mongodb://localhost/nest-auth-tutorial'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
