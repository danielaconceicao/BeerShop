import { createContext } from "react";
import { type BeerContextType } from "../../types/types";

const defaultBeerContext: BeerContextType = {
    beers: [],
    fetchBeers: async () => { }
}

export const BeerContext = createContext<BeerContextType>(defaultBeerContext);