import 'dotenv/config';

const ENV = {
  port: process.env.PORT,
  db_uri: process.env.DATABASE_URI!,
  email_host: process.env.EMAIL_HOST,
  email_username: process.env.EMAIL_USERNAME,
  email_password: process.env.EMAIL_PASSWORD,
  email_port: process.env.EMAIL_PORT,
  jwt_secret: process.env.JWT_SECRET,
  task_queue_name: process.env.TASK_NAME!,
};

export default ENV;
