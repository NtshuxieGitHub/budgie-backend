import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../../activities/users.activities';
import { SignUpDTO, signUpWorkflowDTO } from 'src/modules/users/users_dto';

const { createUser, sendVerificationEmail } = proxyActivities<
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

/*
  User submits sign up details - user created in db
  User is sent verification email
*/
export async function userSignUpWorkflow(
  user: SignUpDTO,
): Promise<signUpWorkflowDTO> {
  const newUser = await createUser(user);
  await sendVerificationEmail(newUser);

  return {
    success: true,
    message: 'User signed up successfully, awaiting account verification',
    data: newUser,
  };
}
