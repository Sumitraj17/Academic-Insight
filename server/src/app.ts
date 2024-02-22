import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';

config();
const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//multer setup
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const uploadDir = path.join(__dirname, 'uploads/');

        try {
            await mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            console.log(error.message);
            cb(error, null);
        }
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage: storage });

//remove in production environment
app.use(morgan('dev'));
export { app, upload };