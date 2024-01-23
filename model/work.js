import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    enTitle: {
      type: String,
      required: [true, "job title is required"],
    },
    arTitle: {
      type: String,
      required: [true, "job title is required"],
    },
    krTitle: {
      type: String,
      required: [true, "job title is required"],
    },
    url: {
      type: String,
      required: [true, "url name is required"],
    },
    company: {
      type: String,
      required: [true, "company name is required"],
    },
    imageName: {
      type: String,
      required: [true, "imageName is required"],
    },
    imageURL: {
      type: String,
      required: [true, "imageURL is required"],
    },
    from: {
      type: Date,
      required: [true, "from time is required"],
    },
    to: {
      type: Date,
    },
    continue: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Work = new mongoose.model("Work", WorkSchema);

export default Work;
