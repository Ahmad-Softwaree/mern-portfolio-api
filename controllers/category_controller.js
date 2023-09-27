import { checkBody } from "../functions/check.js";
import Blog from "../model/blog_model.js";
import Category from "../model/category_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  alreadyExistByThreeField,
  findAll,
  findOneById,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { blogPopulation } from "../query/populations.js";
import { selectData } from "../query/selectData.js";
import { updateOneById } from "../query/update_data.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await findAll("category", Category, false);
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const category = await findOneById(
      "category",
      Category,
      req.params.category_id,
      false
    );
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    await alreadyExistByThreeField(
      "category",
      Category,
      "enName",
      req.body.enName,
      false,
      "arName",
      req.body.arName,
      false,
      "krName",
      req.body.krName,
      false,
      "or"
    );
    const category = await insertData("category", Category, req.body, false);
    return res
      .status(200)
      .json({ data: category, message: "Category added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const category = await updateOneById(
      "category",
      Category,
      req.params.category_id,
      req.body,
      false
    );
    return res
      .status(200)
      .json({ data: category, message: "Category Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    let blogs = await findAll(
      "blog",
      Blog,
      true,
      blogPopulation(true),
      selectData(["categories"])
    );

    for (const val of blogs) {
      if (
        val.categories.find(
          (val) => val.category._id.toString() === req.params.category_id
        )
      )
        return res.status(400).json({ error: "Category Used" });
    }

    await deleteById("category", Category, req.params.category_id);
    return res.status(200).json({
      data: req.params.category_id,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
