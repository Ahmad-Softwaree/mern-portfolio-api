import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
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
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category",
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Blog = new mongoose.model("blog", BlogSchema);

export default Blog;
