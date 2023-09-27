import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";

import {
  addWork,
  deleteWork,
  getAllWorks,
  getOneWork,
  updateWork,
} from "../controllers/work_controller.js";

const workRouter = express.Router();

workRouter.get("/", getAllWorks);

workRouter.get("/:work_id", admin_middleware, getOneWork);

workRouter.post("/", admin_middleware, addWork);

workRouter.put("/:work_id", admin_middleware, updateWork);

workRouter.delete("/:work_id", admin_middleware, deleteWork);

export default workRouter;
