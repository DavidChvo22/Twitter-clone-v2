import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  content: string;
}
