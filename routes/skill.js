import express from "express";
import userMiddleware from "../middleware/user.js";

import {
  addSkill,
  deleteSkill,
  getSkills,
  getSkill,
  updateSkill,
} from "../controllers/skill.js";
import { body } from "express-validator";
import { checkBody } from "../middleware/validation/validation.js";

const skillRouter = express.Router();

skillRouter.get("/", getSkills);

skillRouter.get("/:id", userMiddleware, getSkill);

skillRouter.post(
  "/",
  userMiddleware,
  body("name").exists().notEmpty(),
  body("types").exists().notEmpty(),
  body("imageName").exists().notEmpty(),
  body("imageURL").exists().notEmpty(),
  checkBody,
  addSkill
);

skillRouter.put(
  "/:id",
  userMiddleware,
  body("name").exists().notEmpty(),
  body("types").exists().notEmpty(),
  body("imageName").exists().notEmpty(),
  body("imageURL").exists().notEmpty(),
  checkBody,
  updateSkill
);

skillRouter.delete("/:id", userMiddleware, deleteSkill);

export default skillRouter;
