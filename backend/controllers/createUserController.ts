import db from '../database/db';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ResultSetHeader } from 'mysql2';
import { UserRequest } from '../types';
import { MySQLError } from '../types';

//verifica se l'oggetto errore è un errore di MySQL 
function isMySQLError(error: unknown): error is MySQLError {
    if (typeof error === 'object' && error !== null) {
        const err = error as Partial<MySQLError>;
        return typeof err.code === 'string' && typeof err.message === 'string';
    };
    return false
}

export const createUser = async (req: Request<object, object, UserRequest>, res: Response): Promise<void> => {

    const { email, first_name, pass } = req.body;

    try {
        const saltRounds = 10;/* number of salt rounds */
        const hashedPassword = await bcrypt.hash(pass, saltRounds);//hash della password dell'utente con un numero specifico di salt
        const newUser = 'INSERT INTO users(email, first_name, pass) VALUES(?, ?, ?)';//inserire un nuovo utente

        const [results] = await db.query<ResultSetHeader>(newUser, [email, first_name, hashedPassword]);//query di inserimento nel database

        //in caso di successo, includendo un messaggio e i dettagli dell'utente 
        res.status(201).json({
            message: 'User registered successfully!',
            userId: results.insertId,
            email: email
        });
    } catch (error) {
        console.error('Error inserting user into DataBase:', error);

        if (isMySQLError(error)) {

            if (error.code === 'ER_DUP_ENTRY' && error.message.includes('email')) {
                res.status(409).json({ error: 'This email is already registered.' });
                return;
            }
        }

        res.status(500).json({ error: 'Internal server error when registering user.' });
    }

}






