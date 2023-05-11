import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("user", UserSchema);

export default User;
