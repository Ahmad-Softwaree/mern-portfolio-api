import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  searchProject,
  updateProject,
} from "../controllers/project.js";
import { checkBody } from "../middleware/validation/validation.js";
import userMiddleware from "./../middleware/user.js";
import express from "express";
import { body } from "express-validator";

const projectRouter = express.Router();
projectRouter.get("/search/:search", searchProject);

projectRouter.get("/:category", getProjects);
projectRouter.get("/one/:id", getProject);

projectRouter.post(
  "/",
  userMiddleware,
  body("enTitle", "enTitle is required").notEmpty().exists(),
  body("arTitle", "arTitle is required").notEmpty().exists(),
  body("krTitle", "krTitle is required").notEmpty().exists(),

  body("enDesc", "enDesc is required").notEmpty().exists(),
  body("arDesc", "arDesc is required").notEmpty().exists(),
  body("krDesc", "krDesc is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("stacks", "stacks is required").notEmpty().exists(),
  body("types", "types is required").notEmpty().exists(),

  checkBody,

  addProject
);

//update a user
projectRouter.put(
  "/:id",
  userMiddleware,
  body("enTitle", "enTitle is required").notEmpty().exists(),
  body("arTitle", "arTitle is required").notEmpty().exists(),
  body("krTitle", "krTitle is required").notEmpty().exists(),

  body("enDesc", "enDesc is required").notEmpty().exists(),
  body("arDesc", "arDesc is required").notEmpty().exists(),
  body("krDesc", "krDesc is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("stacks", "stacks is required").notEmpty().exists(),
  body("types", "types is required").notEmpty().exists(),

  checkBody,

  updateProject
);

//delete a user
projectRouter.delete("/:id", userMiddleware, deleteProject);
export default projectRouter;
