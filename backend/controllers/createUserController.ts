import db from '../database/db';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ResultSetHeader, QueryError } from 'mysql2';
import { UserRequest } from '../types';
import emailRegex from '../utils/helper';

function createUser(req: Request<object, object, UserRequest>, res: Response) {

    const { email, first_name, pass } = req.body;
    const userPassword = pass;

    if (!email || !first_name || !pass) {
        res.status(400).json({ error: 'Email, name and password are required' });
        return;
    }

    if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    if (pass.length < 8) {
        res.status(400).json({ error: 'Password must be at least 8 characters long.' });
        return;
    }

    const saltRounds = 10;/* number of salt rounds */
    bcrypt.hash(userPassword, saltRounds, (hashError, hashPassword) => {
        if (hashError) {
            return res.status(500).json({ error: 'Internal server error while processing password.' });
        }

        const newUser = 'INSERT INTO users(email, first_name, pass) VALUES(?, ?, ?)';

        db.query(newUser, [email, first_name, hashPassword], (error: QueryError | null, results: ResultSetHeader) => {
            if (error) {
                console.error('Error inserting user into DataBase:', error);
                if (error.code === 'ER_DUP_ENTRY' && error.message.includes('email')) {
                    return res.status(409).json({ error: 'This email is already registered.' });
                }

                return res.status(500).json({ error: 'Internal server error when registering user.' });
            }

            res.status(201).json({
                message: 'User registered successfully!',
                userId: results.insertId,
                email: email
            });
        });
    });

}

export default { createUser }


