import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema(
  {
    enName: {
      type: String,
      required: [true, "English Name is required"],
    },
    arName: {
      type: String,
      required: [true, "Arabic Name is required"],
    },
    krName: {
      type: String,
      required: [true, "Kurdish Name is required"],
    },
  },
  { timestamps: true }
);

const Type = new mongoose.model("type", TypeSchema);

export default Type;
