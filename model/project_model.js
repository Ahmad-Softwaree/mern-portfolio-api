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
    enType: {
      type: String,
      required: [true, "type is required"],
    },
    arType: {
      type: String,
      required: [true, "type is required"],
    },
    krType: {
      type: String,
      required: [true, "type is required"],
    },
    url: {
      type: String,
      default: "",
    },
    stacks: [
      {
        stack: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "stack",
        },
      },
    ],

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
