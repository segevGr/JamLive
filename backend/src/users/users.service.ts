import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    userName: string,
    password: string,
    role: UserRole,
    instrument: string,
  ): Promise<User> {
    const existing = await this.userModel.findOne({ userName });
    if (existing) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      userName,
      password: hashedPassword,
      role,
      instrument,
    });
    return user.save();
  }

  async findByUserName(userName: string): Promise<User | null> {
    return this.userModel.findOne({ userName }).exec();
  }
}
