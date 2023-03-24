declare namespace NodeJS {
    export interface ProcessEnv {
        MONGO_URI: string;
        PORT: string;
        JWT_SECRET: string;
        GOOGLE_AUTH_CLIENT_ID: string;
        FRONTEND_URL: string;
        S3_BUCKET: string;
        S3_ACCESS_KEY: string;
        S3_ACCESS_SECRET: string;
        S3_PUBLIC_URL: string;
        SES_SENDER_NAME: string;
        SES_SENDER_ADDRESS: string;
    }
}