import express from "express";

import { body } from "express-validator";
import userMiddleware from "../middleware/user.js";
import { checkBody } from "../middleware/validation/validation.js";
import {
  addConfig,
  deleteConfig,
  getConfig,
  updateConfig,
} from "../controllers/config.js";

const configRouter = express.Router();

configRouter.get("/:type", getConfig);

configRouter.post(
  "/",
  userMiddleware,
  body("enName").exists().notEmpty(),
  body("type").exists().notEmpty(),
  checkBody,
  addConfig
);
configRouter.put(
  "/:id",
  userMiddleware,
  body("enName").exists().notEmpty(),
  body("type").exists().notEmpty(),
  checkBody,
  updateConfig
);

configRouter.delete("/:id", userMiddleware, deleteConfig);

export default configRouter;
