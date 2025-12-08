import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: { type: string; required: true; minLength: 3; maxLength: 20 };

  @Prop()
  surname: { type: string; required: true; minLength: 3; maxLength: 20 };

  @Prop()
  username: { type: string; required: true; minLength: 3; maxLength: 20 };

  @Prop()
  email: { type: string; required: true; unique: true };

  @Prop()
  password: { type: string; required: true; minLength: 6; maxLength: 50 };

  @Prop()
  verified: { type: boolean; required: true; default: false };
}

export const UserSchema = SchemaFactory.createForClass(User);
