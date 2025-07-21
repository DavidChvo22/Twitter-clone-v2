import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Tweet } from './schemas/tweet.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TweetService {
  constructor(@InjectModel(Tweet.name) private tweetModel: Model<Tweet>) {}

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.find().exec();
  }

  async create(content: string, userId: string): Promise<Tweet> {
    const newTweet = new this.tweetModel({ content: content, user: userId });
    return newTweet.save();
  }

  async delete(userId: string): Promise<boolean> {
    const result = await this.tweetModel.deleteOne({ _id: userId }).exec();
    return result.deletedCount > 0;
  }
}
