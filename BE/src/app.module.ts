import { Module } from '@nestjs/common';
import { TweetModule } from './twe/tweet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './use/users.module';
import { AuthModule } from './au/auth.module';
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
