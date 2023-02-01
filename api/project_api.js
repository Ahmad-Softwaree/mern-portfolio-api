import express from "express";
import Project from "../model/project_model.js";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
import { body, validationResult } from "express-validator";
dotenv.config();

const projectApp = express.Router();

//router  GET projects
//@access private

projectApp.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
  }
});

//router  POST  project
//@access private
projectApp.post(
  "/",
  [
    auth,
    [
      body("enTitle", "title is required").not().isEmpty(),
      body("arTitle", "title is required").not().isEmpty(),
      body("krTitle", "title is required").not().isEmpty(),
      body("image", "image is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    let { enTitle, arTitle, krTitle, url, image } = req.body;
    try {
      const project = new Project({
        user: req.user_id,
        enTitle,
        arTitle,
        krTitle,
        url,
        image,
      });
      await project.save();

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

//router  PUT project
//@access private

projectApp.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!project) return res.status(400).json({ error: "project not exist" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//router  DELETE project
//@access private

projectApp.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(400).json({ error: "blog not exist" });
    res.status(200).json({ message: "project deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default projectApp;
