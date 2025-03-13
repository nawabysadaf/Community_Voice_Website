import express from 'express'

// importing and assigning the express and port number
const app = express()
const PORT = 3000

// starting the server
app.listen(PORT, () => {
    console.log('starting server on port ${PORT}')
})