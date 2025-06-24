import { createContext } from "react";
import { type AuthContextType } from '../../types/types'

const defaultAuthContext: AuthContextType = {
    user: null,
    token: null,
    authError: null,
    login: async () => {}
    /* logout: () => {}, */
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);