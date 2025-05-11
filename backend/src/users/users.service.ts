import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string, role: UserRole, instrument: string): Promise<User> {
	const existing = await this.userModel.findOne({ email });
	if (existing) throw new ConflictException('User already exists');
  
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new this.userModel({ email, password: hashedPassword, role, instrument });
	return user.save();
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
