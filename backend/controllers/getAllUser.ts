import pool from '../database/db';
import { Response, Request } from 'express';
import { RowDataPacket } from "mysql2";

export const getAllUser = async (req: Request, res: Response) => {
    const { email } = req.query;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT email FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
        res.json({ exists: true });
        return
    } else {
        res.json({ exists: false });
        return
    }
}