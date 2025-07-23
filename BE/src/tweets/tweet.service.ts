import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Tweet } from './schemas/tweet.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TweetService {
  constructor(@InjectModel(Tweet.name) private tweetModel: Model<Tweet>) {}

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(tweetId: string): Promise<Tweet | null> {
    return this.tweetModel.findById(tweetId).exec();
  }

  async create(content: string, userId: string): Promise<Tweet> {
    const newTweet = new this.tweetModel({ content: content, user: userId });
    const saved = await newTweet.save();
    return saved;
  }

  async delete(
    tweetId: string,
    userId: string,
  ): Promise<'not_found' | 'forbidden' | 'deleted'> {
    const tweet = await this.findById(tweetId);
    if (!tweet) {
      return 'not_found';
    }
    let tweetUserId: string;
    if (typeof tweet.user === 'object' && tweet.user && '_id' in tweet.user) {
      tweetUserId = String(tweet.user._id);
    } else {
      tweetUserId = String(tweet.user);
    }
    if (tweetUserId !== userId) {
      return 'forbidden';
    }
    await this.tweetModel.deleteOne({ _id: tweetId }).exec();
    return 'deleted';
  }
}
