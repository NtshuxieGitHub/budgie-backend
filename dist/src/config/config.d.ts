import 'dotenv/config';
declare const ENV: {
    port: string | undefined;
    db_uri: string;
};
export default ENV;
