import express, { request, response } from 'express'
import mongoose from 'mongoose'
import models from './models/users.js'
import { logger } from './middlewares/logger.js' 
import path from 'path'
import { fileURLToPath } from 'url'
import { error } from 'console'

const app = express()
const PORT = 3000
mongoose.connect('mongodb://127.0.0.1:27017/communityVoiceDatabse')
    .then(() => console.log('databse connected'))
    .catch(error => console.error(error))

// seting the engine to ejs
app.set('view engine', 'ejs')
app.set('views', './pages')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from the 'pages' directory
app.use('/', express.static(path.join(__dirname, 'pages')));

// this route is for the signing in page and will respond with directing to the home page
app.post('/sign-in', (request, response) => {
    response.sendFile(path.join(__dirname, 'pages', 'home.html'))
})

// this route is for the signing up or registration page and will respond with directing to the home page
app.post('/sign-up', (request, response) => {
    response.sendFile(path.join(__dirname, 'pages', 'home.html'))
})

// the existing route handling code
app.get('/:page', (request, response) => {
  const page = request.params.page;
  response.render(`${page}`)
});

app.listen(PORT, () => {
    console.log(`starting server on port ${PORT}`)
})