import express, { request, response } from 'express'
import mongoose from 'mongoose'
import { logger } from './middlewares/logger.js' 
import path from 'path'
import { fileURLToPath } from 'url'
import { error } from 'console'
import favicon from 'serve-favicon'
import Reports from './models/reports.js'

const app = express()
const PORT = 3000


mongoose.connect('mongodb://127.0.0.1:27017/communityVoiceDatabse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// seting the engine to ejs
app.set('view engine', 'ejs')
app.set('views', './pages')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'pages' directory
app.use('/', express.static(path.join(__dirname, 'pages')));
app.use(favicon(path.join(__dirname, 'pages', 'favicon.ico')));

// this route is for the reporting page and will respond with directing to the track page
app.post('/report',  (request, response) => {
    const { name, email, category, address, details } = request.body;

    if (!name || !email || !category || !address || !details ) {
        response.render('track');
        console.log("missing details")
        return
    }

    const newReport = new Reports({
        name,
        email,
        category,
        address,
        details
    });

    newReport.save()
        .then(() => response.status(201).render('track'))
        .catch(err => response.status(500).send('Error creating report: ' + err.message));
});

// get route for home page
app.get("/", (request, response) => {
    response.render("home")
})

// get route for profile page
app.get("/profile", (request, response) =>{
    response.render("profile")
})

// get route for report page
app.get("/report", (request, response) => {
    response.render("report")
})

// get route for track page
app.get("/track", (request, response) => {
    response.render("track")
})

// get route to access data from database
app.get("/reports", async (request, response) => {
    try{
        const reports = await Reports.find()
        reports.forEach(report => {
            response.status(200).render("home")
        })
    } catch (error){
        console.error(error)
    }
})

// listener route
app.listen(PORT, () => {
    console.log(`starting server on port ${PORT}`)
})