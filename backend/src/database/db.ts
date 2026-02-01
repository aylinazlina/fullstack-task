
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI; // Or whatever you named it
    if (!url) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    await mongoose.connect(url);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
};