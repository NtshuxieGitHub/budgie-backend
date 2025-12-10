import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  UserVerificationDTO,
  SignUpDTO,
  SignInDTO,
  userIdDTO,
} from './users_dto';
import { getTemporalClient } from 'src/temporal/client';
import { Logger } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private client = getTemporalClient();
  private readonly logger = new Logger(UserController.name, {
    timestamp: true,
  });

  @Post('sign-up')
  async signUp(
    @Body() user: SignUpDTO,
  ): Promise<{ success: string; message: string; workflowId: string }> {
    try {
      return await this.userService.signUp(user);
    } catch (error) {
      this.logger.log('Failed to sign in: ', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to sign up.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Post('verify-email')
  async verifyEmail(
    @Body() verificationData: UserVerificationDTO,
  ): Promise<{ success: string; message: string; workflowId: string }> {
    try {
      return await this.userService.verifyEmail(verificationData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to verify user email account.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get('sign-in')
  async signIn(@Body() userSignInDetails: SignInDTO) {
    try {
      return await this.userService.signIn(userSignInDetails);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to sign-in.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async delete(@Body() userId: userIdDTO) {
    try {
      return await this.userService.deleteAccount(userId);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to delete user account.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  // Account reactivation
  // @Patch(':id/reactivate')
  // async reactivate() {}

  // Password reset endpoint
  // @Patch(':id')
  // async patch() {}

  // delayed account deletion
}
