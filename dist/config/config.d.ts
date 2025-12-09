import 'dotenv/config';
declare const ENV: {
    port: string | undefined;
    db_uri: string;
    email_host: string | undefined;
    email_username: string | undefined;
    email_password: string | undefined;
    email_port: string | undefined;
    jwt_secret: string | undefined;
    task_queue_name: string;
    namespace: string | undefined;
    temporal_client: string;
};
export default ENV;
