import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";
import {
  addProject,
  projectSearch,
  deleteProject,
  getAllProjects,
  getProjectsByStack,
  getHomeProjects,
  getOneProject,
  getPanelProjects,
  getRandomProjects,
  updateProject,
  getProjectsByType,
} from "../controllers/project_controller.js";

const projectRouter = express.Router();

projectRouter.get("/home", getHomeProjects);

projectRouter.get("/all", getAllProjects);
projectRouter.get("/random", getRandomProjects);

projectRouter.get("/:search", projectSearch);

projectRouter.get("/panel", admin_middleware, getPanelProjects);

projectRouter.get("/one/:project_id", getOneProject);

projectRouter.get("/stack/:stack_id", getProjectsByStack);
projectRouter.get("/type/:type_id", getProjectsByType);

projectRouter.post("/", admin_middleware, addProject);

projectRouter.put("/:project_id", admin_middleware, updateProject);

projectRouter.delete("/:project_id", admin_middleware, deleteProject);

export default projectRouter;
