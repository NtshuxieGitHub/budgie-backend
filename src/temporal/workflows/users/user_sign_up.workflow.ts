import {
  proxyActivities,
  defineSignal,
  setHandler,
  sleep,
} from '@temporalio/workflow';
import type * as activities from '../../activities/users.activities';
import { SignUpDTO, UserVerificationDTO } from 'src/modules/users/users_dto';
import { UserDocument } from 'src/schemas/user.schema';

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
export const submitVerificationCodeSignal = defineSignal<[UserVerificationDTO]>(
  'submitVerificationCode',
);

/*
  User submits sign up details - user created in db
  User is sent verification email
  Workflow awaits verification code signal
  User submits verification code
  Workflow receives signal and verifies email
*/
export async function userSignUpWorkflow(user: SignUpDTO): Promise<{
  success: boolean;
  message: string;
  data: UserDocument;
  verificationData: UserVerificationDTO;
}> {
  const newUser = await createUser(user);
  await sendVerificationEmail(newUser);

  let verificationCodeData: UserVerificationDTO | undefined;
  setHandler(
    submitVerificationCodeSignal,
    (verificationData: UserVerificationDTO) => {
      verificationCodeData = verificationData;
    },
  );

  while (!verificationCodeData) {
    await sleep('3s');
  }

  await verifyUserEmail(verificationCodeData);

  return {
    success: true,
    message: 'User signed up successfully',
    data: newUser,
    verificationData: verificationCodeData,
  };
}
