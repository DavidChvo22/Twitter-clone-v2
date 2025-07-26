import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from '../users/user.schema';

@Schema({ collection: 'tweets', timestamps: true })
export class Tweet extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
