import {
  defineSignal,
  proxyActivities,
  setHandler,
  sleep,
} from '@temporalio/workflow';
import type * as activities from '../../activities/users.activities';
import {
  SignUpDTO,
  signUpWorkflowDTO,
  UserVerificationDTO,
} from 'src/modules/users/users_dto';
import { getUserModel } from 'src/temporal/lib/helpers';

const { createUser, sendVerificationEmail, verifyUserEmail, getUserById } =
  proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
    retry: {
      initialInterval: '5 second',
      maximumAttempts: 10,
      backoffCoefficient: 3,
      maximumInterval: '90 seconds',
    },
  });

// Signal to receive verification code from user
export const verificationCodeSignal = defineSignal<[UserVerificationDTO]>(
  'userVerificationCodeReceived',
);

/*
  User submits sign up details - user created in db
  User is sent verification email
  Workflow awaits verification code signal
  User submits verification code
  Workflow receives signal and verifies email
*/
export async function userSignUpWorkflow(
  user: SignUpDTO,
): Promise<signUpWorkflowDTO> {
  const newUser = await createUser(user);
  const updatedUser = await sendVerificationEmail({
    id: newUser._id.toString(),
  });

  let userSubmittedInfo: UserVerificationDTO | undefined;
  setHandler(
    verificationCodeSignal,
    (verificationInfo: UserVerificationDTO) => {
      userSubmittedInfo = verificationInfo;
    },
  );

  while (true) {
    if (userSubmittedInfo) {
      const user = await getUserById({ id: updatedUser._id.toString() });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      if (!user?.verificationExpires) {
        return {
          success: false,
          message: 'Not verificate window available',
        };
      }

      if (Date.now() > user.verificationExpires.getTime()) {
        return {
          success: false,
          message: 'Verification code expired',
        };
      }

      if (user.verificationCode !== userSubmittedInfo.code) {
        userSubmittedInfo = undefined;
        await sleep(500);
        continue;
      }

      await verifyUserEmail(userSubmittedInfo);
    }
  }

  return {
    success: true,
    message: 'User signed up successfully, awaiting account verification',
    originalUserData: newUser,
    updatedUserData: updatedUser,
  };
}
