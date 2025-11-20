import 'dotenv/config'

// Export environment variables for use in the app
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

export {
    PORT,
    MONGODB_URI
}
