import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    enTitle: {
      type: String,
      alias: "title",
      required: [true, "title is required"],
      unique: [true, "Must be unique"],
    },
    arTitle: {
      type: String,
      alias: "title",
      required: [true, "title is required"],
      unique: [true, "Must be unique"],
    },
    krTitle: {
      type: String,
      alias: "title",
      required: [true, "title is required"],
      unique: [true, "Must be unique"],
    },
    enBody: {
      type: String,
      alias: "body",
      required: [true, "body is required"],
    },
    arBody: {
      type: String,
      alias: "body",
      required: [true, "body is required"],
    },
    krBody: {
      type: String,
      alias: "body",
      required: [true, "body is required"],
    },
    imageName: {
      type: String,
      required: [true, "imageName is required"],
    },
    imageURL: {
      type: String,
      required: [true, "imageURL is required"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Config",
      },
    ],
  },
  { timestamps: true }
);

const Blog = new mongoose.model("Blog", BlogSchema);

export default Blog;
