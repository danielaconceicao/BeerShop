import * as dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import { JWT_SECRET } from '../utils/jwt';


export function VerifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token not provided or invalid format' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error validating token:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
}