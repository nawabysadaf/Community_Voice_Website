import express from 'express';
import mongoose from 'mongoose';
import { logger } from './middlewares/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';
import methodOverride from 'method-override';
import './config/database.js';
import { PORT } from './config/app.js';
import reportsRouter from './controllers/reports.js';
import 'dotenv/config'

const app = express();
// dotenv.config();

// seting the engine to ejs
app.set('view engine', 'ejs');
app.set('views', './pages');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'pages' directory
app.use('/', express.static(path.join(__dirname, 'pages')));
app.use(favicon(path.join(__dirname, 'pages', 'favicon.ico')));
app.use(methodOverride("_method"));

// Use the reports router for all report-related routes
app.use('/', reportsRouter);

app.get('/', (request, response) => {
    response.render('home')
});

// the existing route handling code
app.get('/:page', (request, response) => {
    const page = request.params.page;
    response.render(`${page}`)
});

// listener route
app.listen(PORT, () => {
    // console.log(process.env.MONGODB_URI);
    console.log(`starting server on port ${PORT}`)
});