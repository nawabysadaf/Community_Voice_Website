import express, { request, response } from 'express'

// importing and assigning the express and port number
const app = express()
const PORT = 3000

// seting a route
app.get('/', (request, response) => {
    response.send('Your first route is ready')
})

// starting the server
app.listen(PORT, () => {
    console.log('starting server on port ${PORT}')
})