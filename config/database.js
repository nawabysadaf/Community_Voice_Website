import mongoose from "mongoose";
import { MONGODB_URI } from './app.js';
import 'dotenv/config';
// mongodb+srv://admin:HyZkv3aexlAlbcJcd@cluster0.kga59m9.mongodb.net/communityVoiceDatabse?retryWrites=true&w=majority&appName=Cluster0
console.log('🔐 MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(MONGODB_URI)
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))

export const db = mongoose.connection