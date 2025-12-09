import { Client, Connection } from '@temporalio/client';

const client: Client = makeClient();

function makeClient(): Client {
  const connection = Connection.lazy({
    address: 'localhost:7233',
  });
  return new Client({ connection });
}

export function getTemporalClient(): Client {
  return client;
}
