import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<User> {
    const normalizedUserName = userName.toLowerCase();
    const user = await this.usersService.findByUserName(normalizedUserName);
    if (!user)
      throw new UnauthorizedException('Incorrect userName or password');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Incorrect userName or password');

    return user;
  }

  async login(userName: string, password: string) {
    const user = await this.validateUser(userName, password);

    const token = this.generateJwtForUser(user);

    return {
      access_token: token,
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role,
        instrument: user.instrument,
      },
    };
  }

  generateJwtForUser(user: User): string {
    const payload = {
      sub: user._id,
      userName: user.userName,
      role: user.role,
      instrument: user.instrument,
    };
    return this.jwtService.sign(payload);
  }
}
