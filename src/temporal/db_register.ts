import mongoose from 'mongoose';
import { UserSchema } from '../schemas/user.schema';
import ENV from '../config/config';

let isConnected = false;
export async function dbRegister() {
  if (isConnected) return;

  await mongoose.connect(ENV.db_uri);
  mongoose.model('User', UserSchema);
  isConnected = true;
}
