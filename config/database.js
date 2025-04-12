import mongoose from "mongoose";
import { MONGODB_URI } from './app.js';

// mongodb+srv://admin:HyZkv3aexlAlbcJcd@cluster0.kga59m9.mongodb.net/communityVoiceDatabse?retryWrites=true&w=majority&appName=Cluster0
const connectDB = async() => {
  try {
    await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
  });
  console.log('💽 Database connected');
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;