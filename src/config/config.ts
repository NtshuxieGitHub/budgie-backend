import 'dotenv/config';

const ENV = {
  port: process.env.PORT,
  db_uri: process.env.DATABASE_URI!,
};

export default ENV;
