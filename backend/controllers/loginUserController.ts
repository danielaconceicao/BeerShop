import { Request, Response } from "express";
import { UserRequest } from "../types";
import db from '../database/db';
import { QueryError } from "mysql2";
import bcrypt from 'bcrypt';

function login(req: Request<object, object, UserRequest>, res: Response) {
    const { email, pass } = req.body;

    if (!email || !pass) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error: QueryError | null, results) => {
        if (error) {
            console.error('Error querying the database:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const users = results as UserRequest[];

        if (users.length === 0) return res.status(401).json({ error: 'Email or password incorrect' });

        const user = users[0];

        bcrypt.compare(pass, user.pass, (bcryptErr, isMatch) => {
            if (bcryptErr) {
                console.error('Error comparing passwords:', bcryptErr);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!isMatch) {
                res.status(401).json({ error: 'Email or password incorrect' });
                return;
            }

            res.status(200).json({
                message: 'Login successful!',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.first_name
                }
            });
        });

    });

}

export default { login }