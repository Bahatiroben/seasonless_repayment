import * as dotenv from 'dotenv';
dotenv.config();

export const {
    DATABASE_URL,
    DEV_DATABASE_URL,
    TEST_DATABASE_URL,
    NODE_ENV,
    JWT_SECRET,
} = process.env;
