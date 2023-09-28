import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    types: [
      {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "type",
        },
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

const Skill = new mongoose.model("skill", SkillSchema);

export default Skill;
