import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities/users.activities';
import ENV from '../config/config';

run().catch((err) => console.log(err));

async function run() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });
  try {
    const worker = await Worker.create({
      connection,
      workflowsPath:
        require.resolve('./workflows/users/user_sign_up.workflow.ts'),
      activities,
      taskQueue: ENV.task_queue_name,
    });
    await worker.run();
  } finally {
    await connection.close();
  }
}
