import express, { json } from 'express'
import router from './routes/index.routes.ts';

export const app = express();

app.use(json())
app.use(router);
