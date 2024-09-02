
const mongoose=require("mongoose");
const dotenv=require ("dotenv");
dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongoURI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

  module.exports = connectDB;

