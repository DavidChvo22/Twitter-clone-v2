import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: 'tweets', timestamps: true })
export class Tweet extends Document {
  @ApiProperty({ description: 'ID tweetu' })
  declare _id: string;

  @ApiProperty({ description: 'Obsah tweetu' })
  @Prop({ required: true })
  content: string;

  @ApiProperty({ description: 'ID používateľa' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'Dátum vytvorenia' })
  createdAt: Date;

  @ApiProperty({ description: 'Dátum poslednej úpravy' })
  updatedAt: Date;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
