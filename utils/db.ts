// Mongo DB connection
import "dotenv/config";
import mongoose from "mongoose";

const DATABASE_URI = process.env.DATABASE_URI!;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("connected to Budgie Database Successfully");
  } catch (error) {
    console.error("Error connection to Budgie Database: ", error);
    process.exit(1);
  }
};

export default connectMongoDb;
