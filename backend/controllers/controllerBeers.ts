import connectionDB from '../database/db';
import { Response, Request } from 'express';
import mysql from 'mysql2';

function getBeers(req: Request, res: Response) {
    const dbBeers = 'SELECT product_name, abv, size, brewery, style, country, id, tasting_notes FROM beers';

    connectionDB.query(dbBeers, (err: mysql.QueryError | null, results) => {
        if (err){
            console.error(err)
          return res.status(500).json({ error: 'Database query failed' });  
        } 
        res.json(results)
    });
}

export default {
    getBeers
}
