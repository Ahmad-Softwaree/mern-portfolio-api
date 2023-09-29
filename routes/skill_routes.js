import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";

import {
  addSkill,
  deleteSkill,
  getAllSkills,
  getOneSkill,
  updateSkill,
} from "../controllers/skill_controller.js";

const skillRouter = express.Router();

skillRouter.get("/", getAllSkills);

skillRouter.get("/one/:skill_id", admin_middleware, getOneSkill);

skillRouter.post("/", admin_middleware, addSkill);

skillRouter.put("/:skill_id", admin_middleware, updateSkill);

skillRouter.delete("/:skill_id", admin_middleware, deleteSkill);

export default skillRouter;
