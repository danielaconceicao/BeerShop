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



export interface BeerContextType{
    beers: BeersProps[];
}