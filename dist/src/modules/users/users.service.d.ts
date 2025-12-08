import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserInterface } from './types';
export declare class UserService {
    private usersModel;
    constructor(usersModel: mongoose.Model<User>);
    create(user: UserInterface): Promise<User>;
}
