export interface BeersProps {
    product_name: string,
    abv: number,
    size: string,
    brewery: string,
    style: string,
    contry: string,
    tasting_notes: string,
    id: number
}

export interface BeerContextType {
    beers: BeersProps[];
    fetchBeers: () => Promise<void>;
    /* getBeerById: (id: number) => BeersProps | undefined; */
}

export interface LoginRequestBody {
    email: string,
    pass: string
}

export interface LoginUserResponse {
    id: number,
    email: string,
    first_name: string
}

export interface LoginError {
    error: string,
    message?: string
}

export interface LoginSuccess {
    message: string,
    token: string,
    user: LoginUserResponse
}

export type LoginApiResponse = LoginSuccess | LoginError

export interface AuthContextType {
    user: LoginUserResponse | null,
    token: string | null,
    authError: string | null, 
    login: (email: string, pass: string) => Promise<void>,
    /* logout: () => void */
}

export interface UserRegistration {
    name: string,
    email: string,
    pass: string
}
