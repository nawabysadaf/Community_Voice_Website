import mongoose from "mongoose";
// import { MONGODB_URI } from './app.js';
import 'dotenv/config';


const MONGODB_URI = process.env.MONGODB_URI; // ✅ Now it exists
console.log('🔐 MONGODB_URI:', MONGODB_URI); // Double check it's correct


mongoose.connect(MONGODB_URI)
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))

export const db = mongoose.connection