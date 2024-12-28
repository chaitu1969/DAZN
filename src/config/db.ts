import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const URL = process.env.MONGO_URL as string;

  try {
    await mongoose.connect(URL);
    console.log("MogoDB connected sucessfully");
  } catch (error) {
    console.error("Error in Connecting Database.", error);
    // Safe Exit
    process.exit(1);
  }
};
