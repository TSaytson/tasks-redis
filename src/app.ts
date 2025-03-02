import express from 'express'
import router from './routes/index.routes.ts';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.ts';

export const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);