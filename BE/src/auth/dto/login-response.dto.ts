import { UserResponseDto } from './user-response.dto';

export class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;

  constructor(access_token: string, user: UserResponseDto) {
    this.access_token = access_token;
    this.user = user;
  }
}
