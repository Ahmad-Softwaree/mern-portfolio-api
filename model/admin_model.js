import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
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
    imageName: {
      type: String,
      required: [true, "Please add an image"],
    },
    imageURL: {
      type: String,
      required: [true, "Please add an image"],
    },
  },
  { timestamps: true }
);

const Admin = new mongoose.model("admin", AdminSchema);

export default Admin;
