import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
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
    link: {
      type: String,
      required: [true, "link name is required"],
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

const Work = new mongoose.model("work", WorkSchema);

export default Work;
