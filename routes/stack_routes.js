import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";

import {
  addStack,
  deleteStack,
  getAllStacks,
  getOneStack,
  updateStack,
} from "../controllers/stack_controller.js";

const stackRouter = express.Router();

stackRouter.get("/", getAllStacks);

stackRouter.get("/:stack_id", getOneStack);

stackRouter.post("/", admin_middleware, addStack);

stackRouter.put("/:stack_id", admin_middleware, updateStack);

stackRouter.delete("/:stack_id", admin_middleware, deleteStack);

export default stackRouter;
