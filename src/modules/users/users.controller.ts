import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { UserActivities } from 'src/temporal/activities/users.activities';
import {
  UserVerificationDTO,
  SignUpDTO,
  SignInDTO,
  userIdDTO,
} from './users_dto';
import { getTemporalClient } from 'src/temporal/client';
import ENV from 'src/config/config';
import { userSignUpWorkflow } from 'src/temporal/workflows/users/user_sign_up.workflow';
import { userAccountDeletionWorkflow } from 'src/temporal/workflows/users/account_deletion.workflow';
import { userSignInWorkflow } from 'src/temporal/workflows/users/sign_in.workflow';

@Controller('users')
export class UserController {
  constructor(private usersService: UserActivities) {}

  @Post('sign-up')
  async signUp(
    @Body() user: SignUpDTO,
  ): Promise<{ success: string; message: string; workflowId: string }> {
    const workflowHandle = await getTemporalClient().workflow.start(
      userSignUpWorkflow,
      {
        taskQueue: ENV.task_queue_name,
        workflowId: `${user.email}_${Date.now()}`,
        args: [user],
      },
    );
    return {
      success: 'OK',
      message:
        'User created successfully! Check your email to verify your account',
      workflowId: workflowHandle.workflowId,
    };
  }

  @Post('verify-email')
  async verifyEmail(
    @Body() verificationData: UserVerificationDTO,
  ): Promise<{ success: string; message: string }> {
    if (!verificationData.workflowId) {
      return { success: 'FAIL', message: 'workflowId is required' };
    }

    const workflowHandle = getTemporalClient().workflow.getHandle(
      verificationData.workflowId,
    );
    await workflowHandle.signal('submitVerificationCode', verificationData);

    return {
      success: 'OK',
      message:
        'Verification code submitted. Your account will be verified shortly.',
    };
  }

  @Get('sign-in')
  async signIn(@Body() userSignInDetails: SignInDTO) {
    const signInResult = await getTemporalClient().workflow.start(
      userSignInWorkflow,
      {
        taskQueue: ENV.task_queue_name,
        workflowId: userSignInDetails.id,
        args: [userSignInDetails],
      },
    );
    return signInResult;
  }

  // TODO: Password reset endpoint
  // @Patch(':id')
  // async patch() {}

  @Delete(':id')
  async delete(@Body() userId: userIdDTO) {
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
  }

  // TODO: Account reactivation
  // @Patch(':id/reactivate')
  // async reactivate() {}
}
