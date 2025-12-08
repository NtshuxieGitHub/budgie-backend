import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserInterface } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private usersModel: mongoose.Model<User>,
  ) {}

  async create(user: UserInterface): Promise<User> {
    const newUser = new this.usersModel(user);
    return await newUser.save();
  }
}
