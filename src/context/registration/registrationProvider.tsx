import { useState, type FormEvent, type ReactNode } from 'react';
import { emailRegex, nameRegex } from '../../utils/regexRegistrationUser';
import { type UserRegistration } from '../../types/types';
import { RegistrationContext } from './registrationContext';

export default function RegistrationProvider({ children }: { children: ReactNode }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    
    const VITE_API_REGISTRATION = import.meta.env.VITE_API_REGISTRATION;
    const VITE_API_USERS = import.meta.env.VITE_API_USERS;

    /*funzione per verificare se l'email è già in uso*/
    async function checkEmail(email: string): Promise<boolean> {

        try {
            const response = await fetch(`${VITE_API_USERS}?email=${email}`);
            if (!response.ok) throw new Error('error retrieving data');

            const users: UserRegistration[] = await response.json();

            const usersInUse = users.some(user => user.email === email);
            return usersInUse;
        } catch (error) {
            console.error('Errore nella funzione checkEmail', error);
            setErrorMessage('Errore durante la verifica dell\'email. Riprova.');
            return false
        }
    }

    /*gestore del modulo di registrazione*/
    const handleFormRegistration = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password || !password) {
            setErrorMessage('Compilare correttamente tutti i campi');
            return;
        }

        /*convalida del nome*/
        if (!nameRegex.test(name)) {
            setErrorMessage('Il nome deve iniziare con una lettera maiuscola e contenere almeno 3 lettere.');
            return;
        }

        /*convalida e-mail*/
        if (!emailRegex.test(email)) {
            setErrorMessage('Formato email non valido.');
            return;
        }

        /*controlla se l'email è già in uso*/
        try {
            const emailInUse = await checkEmail(email);
            if(emailInUse){
                setErrorMessage('L\'email è già in uso. Per favore, scegli un\'altra.');
                return
            }

        } catch (error) {
            console.error('Errore durante la verifica dell\'e-mail', error);
        }

        /*preparare i dati per la registrazione*/
        const userData = {
            email: email,
            first_name: name,
            pass: password
        }

        try {
            const response = await fetch(`${VITE_API_REGISTRATION}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante la registrazione')
            }

            setSuccessMessage('Utente registrato con successo');
            setEmail('');
            setName('');
            setPassword('');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Erro durante o registo:', error.message || error);
            setErrorMessage(error.message || 'Erro durante o registo do utilizador.');
        }
    }

    const value = {
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        errorMessage,
        successMessage,
        handleFormRegistration
    }

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    )

}

