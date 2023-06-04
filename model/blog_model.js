import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    enTitle: {
      type: String,
      required: [true, "title is required"],
    },
    arTitle: {
      type: String,
      required: [true, "title is required"],
    },
    krTitle: {
      type: String,
      required: [true, "title is required"],
    },
    enBody: {
      type: String,
      required: [true, "body is required"],
    },
    arBody: {
      type: String,
      required: [true, "body is required"],
    },
    krBody: {
      type: String,
      required: [true, "body is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Blog = new mongoose.model("blog", BlogSchema);

export default Blog;
