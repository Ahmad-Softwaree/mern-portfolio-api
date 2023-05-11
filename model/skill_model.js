import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    categories: [
      {
        header: {
          type: String,
          required: [true, "image is required"],
        },
        skills: [
          {
            image: {
              type: String,
              required: [true, "image is required"],
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
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Skill = new mongoose.model("skill", SkillSchema);

export default Skill;
