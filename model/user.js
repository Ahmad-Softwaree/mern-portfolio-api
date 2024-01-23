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
    bio: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    imageName: {
      type: String,
      required: [true, "Please add an image"],
    },
    imageURL: {
      type: String,
      required: [true, "Please add an image"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);

export default User;
