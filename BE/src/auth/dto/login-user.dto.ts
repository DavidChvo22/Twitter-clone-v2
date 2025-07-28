import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Používateľské meno',
    example: 'JohnDoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Heslo',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserInfoDto {
  @ApiProperty({ description: 'ID používateľa', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Používateľské meno', example: 'JohnDoe' })
  username: string;
}

export class LoginUserResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Informácie o používateľovi',
    type: UserInfoDto,
  })
  user: UserInfoDto;
} 