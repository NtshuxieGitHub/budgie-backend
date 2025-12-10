import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities/users.activities';
import ENV from '../config/config';
import { Logger } from '@nestjs/common';
import { dbRegister } from './db_register';

const logger = new Logger('Worker', { timestamp: true });
run().catch((err) => logger.log('Error running Temporal Worker: ', err));

async function run() {
  await dbRegister();

  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });
  try {
    const worker = await Worker.create({
      connection,
      workflowsPath: require.resolve('./workflows/users/index.ts'),
      activities,
      taskQueue: ENV.task_queue_name,
    });
    await worker.run();
  } finally {
    await connection.close();
  }
}
