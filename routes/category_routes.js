import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from "../controllers/category_controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.get("/:category_id", admin_middleware, getOneCategory);

categoryRouter.post("/", admin_middleware, addCategory);

categoryRouter.put("/:category_id", admin_middleware, updateCategory);

categoryRouter.delete("/:category_id", admin_middleware, deleteCategory);

export default categoryRouter;
