import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Instrument {
  DRUMS = 'drums',
  GUITAR = 'guitar',
  BASS = 'bass',
  SAXOPHONE = 'saxophone',
  KEYBOARD = 'keyboard',
  VOCALS = 'vocals',
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ enum: Instrument, required: true })
  instrument: Instrument;
}

export const UserSchema = SchemaFactory.createForClass(User);
