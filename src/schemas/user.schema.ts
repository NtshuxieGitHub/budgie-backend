import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, minLength: 3, maxLength: 20 })
  name: string;

  @Prop({ type: String, required: true, minLength: 3, maxLength: 20 })
  surname: string;

  @Prop({ type: String, required: true, minLength: 3, maxLength: 20 })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, minLength: 8, maxLength: 80 })
  password: string;

  @Prop({ type: String, minLength: 6, maxLength: 6, default: null })
  verificationCode: string | null;

  @Prop({ type: Date, default: null })
  verificationExpires: Date | null;

  @Prop({ type: Boolean, required: true, default: false })
  verified: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
