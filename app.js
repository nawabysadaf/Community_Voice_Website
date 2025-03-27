import express, { request, response } from 'express'
import mongoose from 'mongoose'
import Users from './models/users.js'
import { logger } from './middlewares/logger.js' 
import path from 'path'
import { fileURLToPath } from 'url'
import { error } from 'console'
import favicon from 'serve-favicon'
import Reports from './models/reports.js'

const app = express()
const PORT = 3000
mongoose.connect('mongodb://127.0.0.1:27017/communityVoiceDatabse')
    // .then(() => console.log('databse connected'))
    // .catch(error => console.error(error))

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

// this route is for the signing in page and will respond with directing to the home page
app.post('/sign-in', (request, response) => {
    response.render('home')
});

// this route is for the signing up or registration page and will respond with directing to the home page
app.post('/sign-up',  (request, response) => {
    const { name, surname, phone, email, password, language } = request.body;

    if (!name || !surname || !phone || !email || !password) {
        response.render('home')
    }

    const newUser = new Users({
        name,
        surname,
        phone,
        email,
        password,
        language
    });

    newUser.save()
        .then(() => response.status(201).render('home'))
        .catch(err => response.status(500).send('Error creating user: ' + err.message));
});

// this route is for the reporting page and will respond with directing to the track page
app.post('/track',  (request, response) => {
    const { name, category, address, details } = request.body;

    if (!name || !category || !address || !details ) {
        response.render('track')
    }

    const newReport = new Reports({
        name,
        category,
        address,
        details
    });

    newReport.save()
        .then(() => response.status(201).render('track'))
        .catch(err => response.status(500).send('Error creating report: ' + err.message));
});

// the existing route handling code
app.get('/:page', (request, response) => {
    const page = request.params.page;
    response.render(`${page}`);
  
    // if (!request.session.userId) {
    //   return response.redirect('/sign-in'); 
    // }
  
    // Users.findById(request.session.userId)
    //   .then(user => {
    //     if (user) {
    //       response.render(`${page}`, { user });
    //     } else {
    //       response.redirect('/sign-in');
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     response.status(500).send('Internal Server Error');
    //   });
});

app.listen(PORT, () => {
    console.log(`starting server on port ${PORT}`)
})