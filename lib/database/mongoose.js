import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGOOSE } = process.env;

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);

    mongoose.connect(MONGOOSE, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 60000,
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
export default connectDb;
