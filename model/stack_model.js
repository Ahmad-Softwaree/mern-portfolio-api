import mongoose from "mongoose";

const StackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "name is required"],
      unique: [true, "Must be unique"],
    },
    color: {
      type: String,
      required: ["true", "color is required"],
    },
  },
  { timestamps: true }
);

const Stack = new mongoose.model("stack", StackSchema);

export default Stack;
