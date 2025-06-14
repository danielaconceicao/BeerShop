import { createContext } from "react";
import { type BeerContextType } from "../types/types";

export const AppContext = createContext<BeerContextType | null>(null);