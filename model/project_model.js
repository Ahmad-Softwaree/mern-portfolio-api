import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
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
    url: {
      type: String,
      default: "",
    },
    urlName: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project = new mongoose.model("project", ProjectSchema);

export default Project;
