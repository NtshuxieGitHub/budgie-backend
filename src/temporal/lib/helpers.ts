import { models, Model, model } from 'mongoose';
import { UserDocument, UserSchema } from '../../schemas/user.schema';

export const getUserModel = (): Model<UserDocument> => {
  if (models.User) {
    return models.User as Model<UserDocument>;
  }
  return model('User', UserSchema) as Model<UserDocument>;
};

export function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
