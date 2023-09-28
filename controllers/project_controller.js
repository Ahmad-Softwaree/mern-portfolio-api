import { checkBody } from "../functions/check.js";
import Project from "../model/project_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  findAll,
  findManyByThreeField,
  findOneById,
  findRandomly,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { projectPopulation } from "../query/populations.js";
import { updateOneById } from "../query/update_data.js";

export const getHomeProjects = async (req, res) => {
  try {
    const projects = await findAll(
      "project",
      Project,
      true,
      projectPopulation(true),
      "",
      10,
      { _id: -1 }
    );
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await findAll(
      "project",
      Project,
      true,
      projectPopulation(true)
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandomProjects = async (req, res) => {
  try {
    const projects = await findRandomly(
      "project",
      Project,
      true,
      projectPopulation(true),
      "",
      5
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPanelProjects = async (req, res) => {
  try {
    const projects = await findAll(
      "project",
      Project,
      true,
      projectPopulation(true),
      ""
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneProject = async (req, res) => {
  try {
    const project = await findOneById(
      "project",
      Project,
      req.params.project_id,
      true,
      projectPopulation(true),
      ""
    );
    return res.status(200).json(project);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json({ error: "object id is not valid" });
    return res.status(500).json({ error: error.message });
  }
};

export const getProjectsByStack = async (req, res) => {
  try {
    let projects = await findAll(
      "project",
      Project,
      true,
      projectPopulation(true),
      ""
    );
    projects = projects.filter((val) =>
      val.stacks.find((one) => one.stack._id.toString() === req.params.stack_id)
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProjectsByType = async (req, res) => {
  try {
    let projects = await findAll(
      "project",
      Project,
      true,
      projectPopulation(true),
      ""
    );
    projects = projects.filter((val) =>
      val.types.find((one) => one.type._id.toString() === req.params.type_id)
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const projectSearch = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    let projects = await findManyByThreeField(
      "project",
      Project,
      "enTitle",
      req.params.search,
      false,
      "arTitle",
      req.params.search,
      false,
      "krTitle",
      req.params.search,
      false,
      "or",
      true,
      projectPopulation(true)
    );
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    let { url, ...other } = req.body;
    const errors = checkBody({ ...other });
    if (errors.length > 0) return res.status(400).json(errors);
    const project = await insertData(
      "project",
      Project,
      { ...req.body, admin: req.admin },
      true,
      projectPopulation(true)
    );
    return res
      .status(200)
      .json({ data: project, message: "project added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    let { url, ...other } = req.body;
    const errors = checkBody({ ...other });
    if (errors.length > 0) return res.status(400).json(errors);
    const project = await updateOneById(
      "project",
      Project,
      req.params.project_id,
      req.body,
      true,
      projectPopulation(true)
    );
    return res
      .status(200)
      .json({ data: project, message: "Project Update Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await deleteById("project", Project, req.params.project_id);
    return res.status(200).json({
      data: req.params.project_id,
      message: "project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
