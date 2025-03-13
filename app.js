import express, { request, response } from 'express'
import { logger } from './middlewares/logger.js' 

// importing and assigning the express and port number
const app = express()
const PORT = 3000

app.use(logger)
app.use('/community-voice', express.static('public'))
app.use(express.urlencoded({ extended: true }))
// seting a route
app.get('/', (request, response) => {
    response.send('Your first route is ready')
})

// starting the server
app.listen(PORT, () => {
    console.log('starting server on port ${PORT}')
})