declare namespace NodeJS {
    export interface ProcessEnv {
        MONGO_URI: string;
        PORT: string;
        JWT_SECRET: string;
        GOOGLE_AUTH_CLIENT_ID: string;
        S3_BUCKET: string;
        S3_ACCESS_KEY: string;
        S3_ACCESS_SECRET: string;
    }
}