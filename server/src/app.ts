import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs/promises';

config();
const app = express();
const __filename = fileURLToPath(import.meta.url); // url of the module
const __dirname = path.dirname(__filename); // directory of the module

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


// file upload middleware
const storage = multer.diskStorage({
    destination: async (req, file, callback) => {
        const { type } = req.body;
        const fileUploadPath = type === "teacher" ? process.env.FILE_UPLOAD_PATH_TEACHER : process.env.FILE_UPLOAD_PATH_STUDENT;
        const uploadDir = path.join(__dirname, fileUploadPath);

        try {
            await fs.mkdir(uploadDir);
            callback(null, uploadDir);
        } catch (error) {
            callback(error, null);
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

export const upload = multer({ storage }).single('file');

//remove in production environment
app.use(morgan('dev'));

export default app;