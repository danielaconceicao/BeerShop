import * as dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';
import { ConnectionOptions } from 'mysql2';

const dbConfig: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const connectionDB = mysql.createConnection(dbConfig);

connectionDB.connect((err) => {
    if(err){
        console.error('database not connected');
    }else{
        console.log('✅ connected to the database');
    }
});

export default  connectionDB;