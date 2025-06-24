import { type LoginRequestBody, type LoginUserResponse, type LoginApiResponse, type LoginSuccess, type LoginError } from '../../types/types';
import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }: { children: ReactNode }) {
    const APILOGIN = import.meta.env.VITE_API_LOGIN;

    const [user, setUser] = useState<LoginUserResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            setToken(null);
            setUser(null);
            return
        }

        const parts = storedToken.split('.');
        if (parts.length !== 3 || !parts[1]) {
            console.error('Token non valido o malformato in localStorage');
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            return;
        }

        try {
            const Payload: LoginUserResponse = JSON.parse(atob(parts[1]));
            setUser({ id: Payload.id, email: Payload.email, first_name: Payload.first_name });
            setToken(storedToken);

        } catch (error) {
            console.error('Errore durante la decodifica del token localStorage', error);
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const loginAccess: LoginRequestBody = {
            email: email,
            pass: password
        }
        const loginUrl = `${APILOGIN}`;

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginAccess)

            });

            const data: LoginApiResponse = await response.json();

            if (response.ok) {
                const successData = data as LoginSuccess;

                console.log('Accesso riuscito');

                localStorage.setItem('token', successData.token);

                setUser(successData.user);
                setToken(successData.token);
                setAuthError(null);

            } else {
                console.error('Errore di connessione al server');

                setAuthError((data as LoginError).error || 'Errore durante l\'accesso');
            }

        } catch (error) {
            console.error('Errore di connessione al server', error);
            
            setAuthError('Impossibile connettersi al server, riprovare più tardi');
        }

    }, [APILOGIN]);


    const authValue = {
        user,
        token,
        authError,
        login
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}