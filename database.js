import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
