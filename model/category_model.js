import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    enName: {
      type: String,
      required: [true, "English Name is required"],
      unique: [true, "Must be unique"],
    },
    arName: {
      type: String,
      required: [true, "Arabic Name is required"],
      unique: [true, "Must be unique"],
    },
    krName: {
      type: String,
      required: [true, "Kurdish Name is required"],
      unique: [true, "Must be unique"],
    },
  },
  { timestamps: true }
);

const Category = new mongoose.model("category", CategorySchema);

export default Category;
