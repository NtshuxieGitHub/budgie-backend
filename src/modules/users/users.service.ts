import { Injectable, Logger } from '@nestjs/common';
import ENV from '../../config/config';
import { getTemporalClient } from 'src/temporal/client';
import {
  SignUpDTO,
  UserVerificationDTO,
  SignInDTO,
  userIdDTO,
} from './users_dto';
import { userSignUpWorkflow } from 'src/temporal/workflows/users/user_sign_up.workflow';
import { userAccountDeletionWorkflow } from 'src/temporal/workflows/users/account_deletion.workflow';
import { signUserIn } from 'src/temporal/activities/users.activities';

@Injectable()
export class UserService {
  private client = getTemporalClient();
  private readonly logger = new Logger(UserService.name, {
    timestamp: true,
  });

  async signUp(user: SignUpDTO) {
    try {
      const workflowId = `signup:${user.email}_${Date.now()}`;
      const handle = await this.client.workflow.start(userSignUpWorkflow, {
        taskQueue: ENV.task_queue_name,
        workflowId,
        args: [user],
      });

      return {
        success: 'OK',
        message: 'User created. Check email for verification.',
        workflowId: handle.workflowId,
      };
    } catch (error) {
      this.logger.log('Failed to sign up', error);
      throw new Error('Failed to sign up');
    }
  }

  async verifyEmail(userVerificationData: UserVerificationDTO) {
    try {
      const workflowId = `signup:${userVerificationData.email}_${Date.now()}`;

      // Get workflow handle using workflow id
      const handle = this.client.workflow.getHandle(workflowId);

      /* Send signal to workflow 
        includes the signal name and payload
      */
      await handle.signal('userVerificationCodeReceived', userVerificationData);

      return {
        success: 'OK',
        message: 'Verification in progress...',
        workflowId,
      };
    } catch (error) {
      this.logger.log('Failed to verify user email account', error);
      throw new Error('Failed to verify user email account');
    }
  }

  async signIn(userSignInDetails: SignInDTO) {
    try {
      return signUserIn(userSignInDetails);
    } catch (error) {
      this.logger.log('Failed to sign user in', error);
      throw new Error('Failed to sign user in');
    }
  }

  async deleteAccount(userId: userIdDTO) {
    try {
      const workflowId = `delete:${userId.id}`;

      await this.client.workflow.start(userAccountDeletionWorkflow, {
        taskQueue: ENV.task_queue_name,
        workflowId,
        args: [userId],
      });

      return {
        success: 'OK',
        message: 'Account deletion scheduled.',
      };
    } catch (error) {
      this.logger.log('Failed to delete user account', error);
      throw new Error('Failed to delete user account');
    }
  }
}
