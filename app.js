import express, { request, response } from 'express'
import { logger } from './middlewares/logger.js' 
import path from 'path'
import { fileURLToPath } from 'url'

// make a .gitignore file, and add it to the project
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// importing and assigning the express and port number
const app = express()
const PORT = 3000

app.use(logger)
app.use('/community-voice', express.static('public'))
app.use(express.urlencoded({ extended: true }))

// this route is for the signing in page and will respond with directing to the home page
app.post('/community-voice/sign-in', (request, response) => {
    response.sendFile(path.join(__dirname, 'pages', 'home.html'))
})

// this route is for the signing up or registration page and will respond with directing to the home page
app.post('/community-voice/sign-up', (request, response) => {
    response.sendFile(path.join(__dirname, 'pages', 'home.html'))
})

// routes that use for the whole websites to directing from one page to another
app.get('/community-voice/page', (request, response) => {
    const page = request.query.page; // Get the 'page' query parameter
  
    switch (page) {
      case 'sign-up':
        response.sendFile(path.join(__dirname, 'pages', 'sign_up.html'));
        break;
      case 'sign-in':
        response.sendFile(path.join(__dirname, 'pages', 'sign_in.html'));
        break;
      case 'home':
        response.sendFile(path.join(__dirname, 'pages', 'home.html'));
        break;
      case 'profile':
        response.sendFile(path.join(__dirname, 'pages', 'profile.html'));
        break;
      case 'report':
        response.sendFile(path.join(__dirname, 'pages', 'report.html'));
        break;
      case 'track':
        response.sendFile(path.join(__dirname, 'pages', 'track.html'));
        break;
      default:
        response.status(404).send('Page not found');
    }
  });

app.listen(PORT, () => {
    console.log('starting server on port ${PORT}')
})