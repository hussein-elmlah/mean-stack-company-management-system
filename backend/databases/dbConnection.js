// db.js
import mongoose from 'mongoose';

// Define an asynchronous function to handle database connection
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mean-stack-db');
    console.log('Connected to MongoDB');
  } catch (error) {
    // If an error occurs during connection, log the error message
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Export the connectDB function to be used in other parts of your application
export default connectDB;
