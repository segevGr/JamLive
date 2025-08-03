import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Instrument, instruments } from './user.instruments';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, minlength: 4, maxlength: 20 })
  userName: string;

  @Prop({ required: true, minlength: 4, maxlength: 100 })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ enum: instruments, required: true })
  instrument: Instrument;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    delete ret.updatedAt;
    return ret;
  },
});
