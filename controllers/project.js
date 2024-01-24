import Project from "../model/project.js";
import dotenv from "dotenv";
dotenv.config();
const { PAGINATION } = process.env;
export const getProjects = async (req, res) => {
  let type = req.params.type;
  let stack = req.params.stack;

  let pages = req.query.pages;
  let offset = (pages - 1) * PAGINATION;
  let findQuery = null;
  if (type && type !== "default" && stack && stack !== "default") {
    findQuery = {
      $and: [
        {
          type: { $in: [type] },
        },
        {
          stack: { $in: [stack] },
        },
      ],
    };
  } else if (stack && stack !== "default") {
    findQuery = {
      stack: { $in: [stack] },
    };
  } else if (type && type !== "default") {
    findQuery = {
      type: { $in: [type] },
    };
  }
  try {
    let projects = await Project.find(findQuery)
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "types",
          select: ["enName", "arName", "krName", "color"],
        },
        {
          path: "stacks",
          select: ["enName", "arName", "krName", "color"],
        },
      ])

      .skip(offset)
      .limit(PAGINATION);

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id).populate([
      {
        path: "user",
        select: ["name", "imageURL", "bio"],
      },
      {
        path: "types",
        select: ["enName", "arName", "krName", "color"],
      },
      {
        path: "stacks",
        select: ["enName", "arName", "krName", "color"],
      },
    ]);

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const searchProject = async (req, res) => {
  let search = req.query.search;
  let regex = { $regex: new RegExp(search, "i") };
  try {
    const projects = await Project.find({
      $or: [{ enTitle: regex }, { arTitle: regex }, { krTitle: regex }],
    })
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "types",
          select: ["enName", "arName", "krName", "color"],
        },
        {
          path: "stacks",
          select: ["enName", "arName", "krName", "color"],
        },
      ])

      .limit(30);
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user });
    return res
      .status(200)
      .json({ data: project, message: "Project added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ data: project, message: "Project updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ data: req.params.id, message: "Project delete successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
