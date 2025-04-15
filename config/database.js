import mongoose from "mongoose";
import 'dotenv/config';


const MONGODB_URI = process.env.MONGODB_URI; 
console.log('🔐 MONGODB_URI:', MONGODB_URI); 

mongoose
  .connect(MONGODB_URI,{
    serverSelectionTimeoutMS: 10000 // 10 seconds
  })
  .then(() => console.log("Database connected ✔️"))
  .catch((error) => console.error(error));

export const db = mongoose.connectiong