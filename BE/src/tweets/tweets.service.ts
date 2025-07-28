import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Tweet } from './tweet.schema';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetsService {
  constructor(@InjectModel(Tweet.name) private tweetModel: Model<Tweet>) {}

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(tweetId: string): Promise<Tweet | null> {
    return this.tweetModel.findById(tweetId).exec();
  }

  async create(createTweetDto: CreateTweetDto, userId: string): Promise<Tweet> {
    const newTweet = new this.tweetModel({
      content: createTweetDto.content,
      userId: userId,
    });
    const saved = await newTweet.save();
    return saved;
  }

  async delete(tweetId: string, userId: string): Promise<void> {
    const tweet = await this.findById(tweetId);
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${tweetId} not found.`);
    }

    const tweetUserId = String(tweet.userId);
    if (tweetUserId !== userId) {
      throw new ForbiddenException('Nemáte oprávnenie vymazať tento tweet.');
    }
    await this.tweetModel.deleteOne({ _id: tweetId }).exec();
  }
}
