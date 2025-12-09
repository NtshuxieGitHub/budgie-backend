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
import ENV from '../../config/config';
import { userSignUpWorkflow } from 'src/temporal/workflows/users/user_sign_up.workflow';
import { userAccountDeletionWorkflow } from 'src/temporal/workflows/users/account_deletion.workflow';
import { userSignInWorkflow } from 'src/temporal/workflows/users/sign_in.workflow';
import { getTemporalClient } from 'src/temporal/client';
import { accountVerificationWorkflow } from 'src/temporal/workflows/users/account_verification.workflow';
import { Logger } from '@nestjs/common';

@Controller('users')
export class UserController {
  private client = getTemporalClient();
  private readonly logger = new Logger(UserController.name, {
    timestamp: true,
  });

  @Post('sign-up')
  async signUp(
    @Body() user: SignUpDTO,
  ): Promise<{ success: string; message: string; workflowId: string }> {
    try {
      const workflowId = `${user.email}_${Date.now()}`;
      this.logger.log('Workflow Id: ', workflowId);

      const handle = await this.client.workflow.start(userSignUpWorkflow, {
        taskQueue: ENV.task_queue_name,
        workflowId: workflowId,
        args: [user],
      });

      return {
        success: 'OK',
        message:
          'User created successfully! Check your email to verify your account',
        workflowId: handle.workflowId,
      };
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
      const workflowId = `${verificationData.code}_${Date.now()}`;
      const handle = await this.client.workflow.start(
        accountVerificationWorkflow,
        {
          taskQueue: ENV.task_queue_name,
          workflowId: workflowId,
          args: [verificationData],
        },
      );

      return {
        success: 'OK',
        message:
          'Verification code submitted. Your account will be verified shortly.',
        workflowId: handle.workflowId,
      };
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
      const signInResult = await getTemporalClient().workflow.start(
        userSignInWorkflow,
        {
          taskQueue: ENV.task_queue_name,
          workflowId: userSignInDetails.id,
          args: [userSignInDetails],
        },
      );
      return signInResult;
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
      // TODO: Account deletion if not reactivated (30 days)

      const accountDeletionResult = await getTemporalClient().workflow.start(
        userAccountDeletionWorkflow,
        {
          taskQueue: ENV.task_queue_name,
          workflowId: userId.id,
          args: [userId],
        },
      );
      return accountDeletionResult;
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

  // TODO: Account reactivation
  // @Patch(':id/reactivate')
  // async reactivate() {}

  // TODO: Password reset endpoint
  // @Patch(':id')
  // async patch() {}
}
