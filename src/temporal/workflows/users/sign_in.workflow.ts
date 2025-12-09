import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../../activities/users.activities';
import { SignInDTO, userSignInWorkflowDTO } from 'src/modules/users/users_dto';
import { UserDocument } from 'src/schemas/user.schema';

const { signUserIn } = proxyActivities<typeof activities>({
  startToCloseTimeout: '3 seconds',
  retry: {
    initialInterval: '2 second',
    maximumAttempts: 5,
    backoffCoefficient: 2,
    maximumInterval: '90 seconds',
  },
});

export async function userSignInWorkflow(
  user: SignInDTO,
): Promise<userSignInWorkflowDTO> {
  const signInResult = await signUserIn(user);

  return {
    success: true,
    message: 'User signed in successfully',
    token: signInResult.token,
    data: signInResult.data,
  };
}
