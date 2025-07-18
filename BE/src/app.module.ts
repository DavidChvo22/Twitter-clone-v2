import { Module } from '@nestjs/common';
import { TweetModule } from './tweets/tweet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TweetModule,
    MongooseModule.forRoot('mongodb://localhost/nest-auth-tutorial'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
