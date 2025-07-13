import { Module } from '@nestjs/common';
import { TweetModule } from './tweet/tweet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TweetModule,
    MongooseModule.forRoot('mongodb://localhost/nest-auth-tutorial'),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
