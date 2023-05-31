import Category from "../model/category_model.js";
import express from "express";
import auth from "../middleware/auth.js";
const categoryApp = express.Router();

categoryApp.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

categoryApp.get("/:category_id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.category_id);
    if (!category) return res.status(400).json({ error: "There is no such category" });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

categoryApp.post("/", auth, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

categoryApp.put("/:category_id", auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.category_id, { $set: req.body }, { new: true });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

categoryApp.delete("/:category_id", auth, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.category_id);
    return res.status(200).json(req.params.category_id);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default categoryApp;
