import Blog from "../model/blog.js";
import Certificate from "../model/certificate.js";
import Config from "../model/config.js";
import Project from "../model/project.js";
export const getConfig = async (req, res) => {
  try {
    let data = await Config.find({ type: req.params.type });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addConfig = async (req, res) => {
  try {
    let data = await Config.create(req.body);
    return res.status(200).json({ data, message: "Config added" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateConfig = async (req, res) => {
  try {
    let data = await Config.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ data, message: "Config update" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteConfig = async (req, res) => {
  try {
    if (
      (await Blog.findOne({ categories: { $in: [req.params.id] } })) ||
      (await Certificate.findOne({ types: { $in: [req.params.id] } })) ||
      (await Certificate.findOne({ stacks: { $in: [req.params.id] } })) ||
      (await Project.findOne({ stacks: { $in: [req.params.id] } })) ||
      (await Project.findOne({ types: { $in: [req.params.id] } }))
    )
      await Config.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      data: req.params.id,
      message: "Config deleted",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
