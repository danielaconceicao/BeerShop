import { useState, useEffect, type ReactNode, useCallback} from "react";
import { type BeersProps } from "../../types/types";
import { BeerContext } from "./BeerContext";

export default function BeerProvider({ children }: { children: ReactNode }) {
    const [beers, setBeers] = useState<BeersProps[]>([]);

    const VITE_API_BEERS = import.meta.env.VITE_API_BEERS;



    const fetchBeers = useCallback(async () => {
        try {
            const response = await fetch(`${VITE_API_BEERS}`);

            if (!response.ok) throw new Error('error retrieving data');

            const data: BeersProps[] = await response.json();
            setBeers(data);

        } catch (err) {
            console.error('Errore nella ricerca delle birre', err);
        }

    }, [VITE_API_BEERS]);


    useEffect(() => {
        fetchBeers();
    }, [fetchBeers]);

    const value = {
        beers,
        fetchBeers
    }

    return (
        <BeerContext.Provider value={value}>
            {children}
        </BeerContext.Provider>
    )
}