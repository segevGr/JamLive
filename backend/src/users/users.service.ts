import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole } from './user.schema';
import { Instrument } from './user.instruments';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    userName: string,
    password: string,
    role: UserRole,
    instrument: string,
  ): Promise<User> {
    const normalizedUserName = userName.toLowerCase();
    const existing = await this.userModel.findOne({
      userName: normalizedUserName,
    });
    if (existing) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      userName: normalizedUserName,
      password: hashedPassword,
      role,
      instrument,
    });
    return user.save();
  }

  async findByUserName(userName: string): Promise<User | null> {
    return this.userModel.findOne({ userName: userName.toLowerCase() }).exec();
  }

  async updateInstrument(userId: string, instrument: Instrument) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    if (user.instrument === instrument) {
      throw new BadRequestException('The new instrument must be different');
    }
    user.instrument = instrument;
    return user.save();
  }

  private async comparePasswords(
    currentPassword: string,
    userPassword: string,
  ) {
    const isMatch = await bcrypt.compare(currentPassword, userPassword);
    if (!isMatch)
      throw new UnauthorizedException('Current password is incorrect');
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.comparePasswords(currentPassword, user.password);

    user.password = await bcrypt.hash(newPassword, 10);
    return await user.save();
  }

  async deleteAccount(userId: string, password: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.comparePasswords(password, user.password);

    await this.userModel.findByIdAndDelete(userId);
  }

  async getUsersList() {
    return this.userModel.find().select('-password');
  }
}
