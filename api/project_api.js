import express from "express";
import Project from "../model/project_model.js";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
dotenv.config();

const projectApp = express.Router();

//router  GET projects
//@access private

projectApp.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate([
      {
        path: "stacks.stack",
        select: ["name", "color", "_id"],
      },
    ]);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//router  GET  one project
//@access private

projectApp.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(400).json({ error: "project does not exist" });
    res.status(200).json(project);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(400).json({ error: "object id is invalid" });
    res.status(500).json({ error: error.message });
  }
});

//router  POST  project
//@access private
projectApp.post("/", auth, async (req, res) => {
  let { enTitle, arTitle, krTitle, enType, arType, krType, url, image, stacks } = req.body;
  if (!enTitle || !arTitle || !krTitle || !enType || !krType || !arType || !image || !url || stacks.length === 0)
    return res.status(400).json({ error: "please provide all the fields" });
  try {
    const project = new Project(req.body);
    project.user = req.user.id;
    await project.save();
    await project.populate([
      {
        path: "stacks.stack",
        select: ["name", "color", "_id"],
      },
    ]);
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  PUT project
//@access private

projectApp.put("/:project_id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.project_id, { $set: req.body }, { new: true });
    if (!project) return res.status(400).json({ error: "project not exist" });
    await project.populate([
      {
        path: "stacks.stack",
        select: ["name", "color", "_id"],
      },
    ]);
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  DELETE project
//@access private

projectApp.delete("/:project_id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.project_id);
    if (!project) return res.status(400).json({ error: "blog not exist" });
    return res.status(200).json(req.params.project_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default projectApp;
