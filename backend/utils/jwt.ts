import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || '';
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not defined');