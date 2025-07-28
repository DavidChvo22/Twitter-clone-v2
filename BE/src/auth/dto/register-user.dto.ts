import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Používateľské meno',
    example: 'JohnDoe',
    minLength: 3,
    maxLength: 16,
  })
  @Matches(/^[A-Z]/, {
    message: 'Username must start with a capital letter',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  username: string;



  @ApiProperty({
    description: 'Heslo',
    example: 'password123',
    minLength: 6,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}

export class RegisterUserResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Informácie o novom používateľovi',
    type: 'object',
    properties: {
      id: { type: 'string', example: '507f1f77bcf86cd799439011' },
      username: { type: 'string', example: 'JohnDoe' },
    },
  })
  user: {
    id: string;
    username: string;
  };
} 