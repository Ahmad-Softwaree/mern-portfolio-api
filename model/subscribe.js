import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "job title is required"],
      unique: [true, "Must be unique"],
    },
  },
  { timestamps: true }
);

const Subscribe = new mongoose.model("subscribe", SubscribeSchema);

export default Subscribe;
