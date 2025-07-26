import { Exclude } from 'class-transformer';

export class UserResponseDto {
  _id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
