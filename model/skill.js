import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sequence: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Must be unique"],
    },
    types: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Config",
      },
    ],
    imageName: {
      type: String,
      required: [true, "imageName is required"],
    },
    imageURL: {
      type: String,
      required: [true, "imageURL is required"],
    },
  },
  { timestamps: true }
);

const Skill = new mongoose.model("Skill", SkillSchema);

export default Skill;
