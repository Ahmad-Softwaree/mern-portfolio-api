import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
    companyName: {
      type: String,
      required: [true, "company name is required"],
    },
    image: {
      type: String,
      required: [true, "company image is required"],
    },
    from: {
      type: Date,
      required: [true, "from time is required"],
    },
    to: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Work = new mongoose.model("work", WorkSchema);

export default Work;
