import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema(
  {
    enName: {
      type: String,
    },
    arName: {
      type: String,
    },
    krName: {
      type: String,
    },
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Config = new mongoose.model("Config", ConfigSchema);

export default Config;
