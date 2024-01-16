import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'

config();
const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

//remove in production environment
app.use(morgan('dev'));

export default app;