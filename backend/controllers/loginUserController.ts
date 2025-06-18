import { Request, Response } from "express";
import { UserRequest } from "../types";
import db from '../database/db';
import bcrypt from 'bcrypt';


//verificare le credenziali di un utente che cerca di accedere al sistema
export const login = async (req: Request<object, object, UserRequest>, res: Response): Promise<void> => {
    const { email, pass } = req.body;

    try {
        //Cerca l'utente nel database tramite email
        const [result] = await db.query<UserRequest[]>('SELECT * FROM users WHERE email = ?', [email]); 

        const users = result as UserRequest[];//converte o resultado da consulta para o tipo UserRequest

        if (users.length === 0){ //controlla se nessun utente è stato trovato con l'email fornita
            res.status(401).json({ error: 'Email or password incorrect' });
            return;
        }

        const user = users[0];//prende il primo utente trovato

        //confronta la password fornita con la password hashata 
        const isMatch = await bcrypt.compare(pass, user.pass);

        //se le password non corrispondono
        if (!isMatch) {
            res.status(401).json({ error: 'Email or password incorrect' });
            return;
        }

        //se il login ha successo
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('❌ Error querying the database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

