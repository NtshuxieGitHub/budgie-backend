import {
  proxyActivities,
  defineSignal,
  setHandler,
  sleep,
} from '@temporalio/workflow';
import type * as activities from '../../activities/users.activities';
import {
  accountVerificationWorkflowDTO,
  UserVerificationDTO,
} from 'src/modules/users/users_dto';

const { verifyUserEmail } = proxyActivities<typeof activities>({
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
  Workflow awaits verification code signal
  User submits verification code
  Workflow receives signal and verifies email
*/
export async function accountVerificationWorkflow(
  verificationCodeData: UserVerificationDTO,
): Promise<accountVerificationWorkflowDTO> {
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
    message: `Email account: ${verificationCodeData.email} verified successfully`,
    verificationCode: verificationCodeData.code,
  };
}
