import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors'
import routers from './routers/beersRouter';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('API beer shopping');
});

app.use('/', routers);

app.listen(port, () => {
    console.log(`Server running at ${host}:${port}`);
});
