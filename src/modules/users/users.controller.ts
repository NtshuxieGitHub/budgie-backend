import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { UserInterface } from './types';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('sign-up')
  async signUp(user: UserInterface): Promise<User> {
    return this.usersService.create(user);
  }

  @Get('sign-in')
  async signIn() {}

  @Patch(':id')
  async patch() {}

  @Delete(':id')
  async delete() {}
}
