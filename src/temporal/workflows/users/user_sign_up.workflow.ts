import {
  condition,
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

const { createUser, sendVerificationEmail, verifyUserEmail } = proxyActivities<
  typeof activities
>({
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
  const id = await createUser(user);
  const updatedUser = await sendVerificationEmail(id);

  let userSubmittedInfo: UserVerificationDTO | undefined;
  setHandler(
    verificationCodeSignal,
    (verificationInfo: UserVerificationDTO) => {
      userSubmittedInfo = verificationInfo;
    },
  );

  while (true) {
    const currentDateAndTime = new Date();
    if (userSubmittedInfo) break;

    if (currentDateAndTime > updatedUser.verificationExpires!) {
      throw Error('Verification code expired');
    }

    await sleep(500);
  }

  const verifiedUserData = await verifyUserEmail(userSubmittedInfo!);

  return {
    success: true,
    message: 'User signed up successfully, awaiting account verification',
    data: verifiedUserData,
  };
}
