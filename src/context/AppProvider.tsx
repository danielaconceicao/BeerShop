import { AppContext } from "./AppContext";
import { useState, useEffect, type ReactNode } from "react";
import { type BeersProps } from "../types/types";

export default function AppProvider({ children }: { children: ReactNode }) {
    const [beers, setBeers] = useState<BeersProps[]>([]);

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/beers`);
            if (!response.ok) throw new Error('error retrieving data');

            const data: BeersProps[] = await response.json();
            setBeers(data);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const value = {
        beers
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}