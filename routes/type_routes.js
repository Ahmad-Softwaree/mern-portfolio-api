import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";
import {
  addType,
  deleteType,
  getAllCategories,
  getOneType,
  updateType,
} from "../controllers/type_controller.js";

const typeRouter = express.Router();

typeRouter.get("/", getAllCategories);

typeRouter.get("/:type_id", admin_middleware, getOneType);

typeRouter.post("/", admin_middleware, addType);

typeRouter.put("/:type_id", admin_middleware, updateType);

typeRouter.delete("/:type_id", admin_middleware, deleteType);

export default typeRouter;
