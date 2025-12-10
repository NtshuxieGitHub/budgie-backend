import { Client } from '@temporalio/client';
import ENV from '../config/config';

let temporalClient: Client;
export function getTemporalClient() {
  if (!temporalClient) {
    temporalClient = new Client({
      namespace: ENV.namespace,
    });
  }
  return temporalClient;
}
