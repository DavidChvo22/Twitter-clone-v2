import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existing = await this.usersService.findOne(username);
    if (existing) throw new Error('Username already taken');

    const hashed = await bcrypt.hash(password, 10);
    return this.usersService.create(username, hashed);
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user) throw new Error('Username or password incorrect');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Username or password incorrect');

    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
