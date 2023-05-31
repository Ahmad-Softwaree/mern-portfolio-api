import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
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
});

const Category = new mongoose.model("category", CategorySchema);

export default Category;
