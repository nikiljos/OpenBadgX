declare namespace NodeJS {
    export interface ProcessEnv {
        MONGO_URI: string;
        PORT: string;
        JWT_SECRET: string;
        GOOGLE_AUTH_CLIENT_ID: string;
    }
}