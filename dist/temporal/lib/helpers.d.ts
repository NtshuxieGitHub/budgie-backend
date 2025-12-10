import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
export declare const getUserModel: () => Model<UserDocument>;
export declare function generateRandomCode(): string;
