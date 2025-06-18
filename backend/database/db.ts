import * as dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise'; //importando il modulo mysql2, con la versione che supporta le promise
import { PoolOptions } from 'mysql2'; //tipizzare le opzioni di configurazione del pool di connessioni

//const dbConfig: PoolOptions: garante che contenga le proprietà corrette per la configurazione del pool di connessioni al database
const dbConfig: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig); //Crea un pool di connessioni al database MySQL usando le opzioni di configurazione definite nella constante dbConfig

//verificare che la connessione al database sia stabilita correttamente all'avvio dell'applicazione
pool.getConnection()
    .then(connection => { 
        console.log('✅ connected to the database');
        connection.release();
    })
    .catch(error => {
        console.error('❌ database not connected', error);
        process.exit(1);
    });

;

export default pool;