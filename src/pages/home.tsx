import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Home() {
    const context = useContext(AppContext);

    if(!context) throw new Error('');

    const {beers} = context;

    return (
        <>
            {beers.map(beer => (
                <div key={beer.id}>
                    <p>{beer.product_name}</p>
                    <p>{beer.abv}%</p>
                    <p>{beer.size}</p>
                    <p>{beer.style}</p>
                </div>
            ))}
        </>
    )
}