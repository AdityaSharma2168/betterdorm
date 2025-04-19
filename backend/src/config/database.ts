import mongoose from 'mongoose';
import config from './index';

const connectDB = async (): Promise<void> => {
  try {
    // Force using MongoDB Atlas connection string for now
    const mongoUri = "mongodb+srv://adityasharma2168:QE6mq47sjU8ZClkt@betterdorm.trg8qmw.mongodb.net/?retryWrites=true&w=majority&appName=betterdorm";
    console.log('Attempting to connect to MongoDB with URI:', mongoUri);
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    if (error instanceof Error && error.stack) {
      console.error(`Stack trace: ${error.stack}`);
    }
    process.exit(1);
  }
};

export default connectDB; 