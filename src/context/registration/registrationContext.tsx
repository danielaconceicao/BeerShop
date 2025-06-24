import { createContext } from "react";

interface RegistartionContextProps {
    name: string,
    email: string,
    password: string,
    errorMessage: string,
    successMessage: string,
    setName: (value: string) => void,
    setEmail: (value: string) => void,
    setPassword: (value: string) => void,
    handleFormRegistration: (e: React.FormEvent) => void,
}

export const RegistrationContext = createContext<RegistartionContextProps | undefined>(undefined);