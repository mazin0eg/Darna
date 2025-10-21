import "dotenv/config";
import mongoose from "mongoose";
const MONGODB_PATH = `${process.env.MONGO_PATH}`;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_PATH);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};
