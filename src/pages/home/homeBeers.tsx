import { useContext } from "react";
import { BeerContext } from "../../context/Beers/BeerContext";
import BeerImage from '../../assets/sem-foto.gif'


export default function Home() {
    const context = useContext(BeerContext);

    if (!context) throw new Error('L\'accesso deve essere utilizzato all\'interno di un AuthProvider');

    const { beers } = context;

    return (
        <>
            <div className="container mt-5">
                <h3 className="pb-4">Le nostre birre</h3>
                <div className="row">
                    {beers.map(beer => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={beer.id} style={{width: '15rem'}}>
                            <div className="card h-100">
                                <img src={BeerImage} alt="image of beer" className="card-img-top" />
                                <div className="card-body">
                                    <p className="card-text">{beer.product_name}</p>
                                    <p className="card-text">{beer.abv}%</p>
                                    <p className="card-text">{beer.size}</p>
                                    <p className="card-text">{beer.style}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}