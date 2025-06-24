import pool from '../database/db';
import { Response, Request } from 'express';
import { BeerFromDB , ReviewFromDB  } from '../types';

//cerca e restituisce tutti i dati sulla birra dal database
export const getBeers = async (req: Request, res: Response) => {
    const dbBeers = 'SELECT product_name, abv, size, brewery, style, country, id, tasting_notes FROM beers';

    try {
        const [results] = await pool.query<BeerFromDB []>(dbBeers);
        res.status(200).json(results);
    } catch (error) {
        console.error('❌ Error getting beers:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
}


//recupera i dettagli di una birra specifica e le sue recensioni tramite ID
export const getBeerById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    //controllo per verificare se l'ID fornito non è un numero valido
    if (isNaN(id)) {
        res.status(400).json({ error: 'Bad request: invalid ID' });
        return;
    }

    try {
        const [beerResult] = await pool.query<BeerFromDB []>('SELECT * FROM beers WHERE id = ?', [id]);

        //se nessuna birra viene trovata, risponde con un errore 404
        if (beerResult.length === 0) {
            res.status(404).json({ error: 'beer not found' });
            return;
        }

        const [reviewsResult] = await pool.query<ReviewFromDB []>('SELECT * FROM reviews WHERE beer_id = ?', [id]);

        //dettagli della birra insieme alle sue recensioni
        res.status(200).json({
            beer: beerResult[0],
            reviewsResult: reviewsResult
        });
    } catch (error) {
        console.error('❌ Error getting beer by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


