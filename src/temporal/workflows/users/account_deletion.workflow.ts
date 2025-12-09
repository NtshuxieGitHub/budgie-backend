import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../../activities/users.activities';
import { userIdDTO } from 'src/modules/users/users_dto';

const { deleteUserAccount } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
  retry: {
    initialInterval: '1 second',
    maximumAttempts: 3,
    backoffCoefficient: 2,
    maximumInterval: '90 seconds',
  },
});

/**/
export async function userAccountDeletionWorkflow(user: userIdDTO) {
  await deleteUserAccount(user);
  return {
    success: true,
    message: 'User account deleted successfully',
  };
}
