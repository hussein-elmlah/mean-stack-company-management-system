import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import connectDB from './databases/dbConnection.js';
import routes from './src/routes.js';
import errorHandler from './middlewares/errorHandler.js';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { port } from './config.env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const uploadImageFolder = path.join(__dirname, 'uploads', 'images');
if (!fs.existsSync(uploadImageFolder)) {
  fs.mkdirSync(uploadImageFolder, { recursive: true });
}

const uploadFileFolder = path.join(__dirname, 'uploads', 'files');
if (!fs.existsSync(uploadFileFolder)) {
  fs.mkdirSync(uploadFileFolder, { recursive: true });
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(routes);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use(errorHandler);

process.on('uncaughtException', (exception) => {
  console.log('Uncaught exception occurred:\n', exception);
  // here use process.exit(1); and use process manager to restart at any stop in deployment phase.
});
process.on('unhandledRejection', (exception) => {
  console.log('unhandled Rejection occurred:\n', exception);
  // here use process.exit(1); and use process manager to restart at any stop in deployment phase.
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
