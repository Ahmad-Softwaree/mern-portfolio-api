import express from "express";
import userMiddleware from "../middleware/user.js";

import {
  addWork,
  deleteWork,
  getWorks,
  getWork,
  updateWork,
} from "../controllers/work.js";
import { body } from "express-validator";
import { checkBody } from "../middleware/validation/validation.js";

const workRouter = express.Router();

workRouter.get("/", getWorks);

workRouter.get("/:id", userMiddleware, getWork);

workRouter.post(
  "/",
  userMiddleware,
  body("enTitle").exists().notEmpty(),
  body("arTitle").exists().notEmpty(),
  body("krTitle").exists().notEmpty(),
  body("url").exists().notEmpty(),
  body("company").exists().notEmpty(),
  body("imageName").exists().notEmpty(),
  body("imageURL").exists().notEmpty(),
  body("from").exists().notEmpty(),
  checkBody,
  addWork
);

workRouter.put(
  "/:id",
  userMiddleware,
  body("enTitle").exists().notEmpty(),
  body("arTitle").exists().notEmpty(),
  body("krTitle").exists().notEmpty(),
  body("url").exists().notEmpty(),
  body("company").exists().notEmpty(),
  body("imageName").exists().notEmpty(),
  body("imageURL").exists().notEmpty(),
  body("from").exists().notEmpty(),
  checkBody,
  updateWork
);

workRouter.delete("/:id", userMiddleware, deleteWork);

export default workRouter;
