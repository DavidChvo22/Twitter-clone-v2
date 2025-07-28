import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'ID používateľa' })
  declare _id: string;

  @ApiProperty({ description: 'Používateľské meno' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ description: 'Heslo (hashované)' })
  @Prop({ required: true })
  @Exclude()
  password: string;

  @ApiProperty({ description: 'Dátum vytvorenia' })
  createdAt: Date;

  @ApiProperty({ description: 'Dátum poslednej úpravy' })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
