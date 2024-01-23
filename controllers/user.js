import Blog from "../model/blog.js";
import Certificate from "../model/certificate.js";
import Project from "../model/project.js";
import Skill from "../model/skill.js";
import User from "../model/user.js";
import Work from "../model/work.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ data: user, message: "Admin updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (
      (await Blog.findOne({ user: req.params.id })) ||
      (await Project.findOne({ user: req.params.id })) ||
      (await Certificate.findOne({ user: req.params.id })) ||
      (await Skill.findOne({ user: req.params.id })) ||
      (await Work.findOne({ user: req.params.id }))
    ) {
      return res.status(400).json({ error: "Can't delete this user" });
    }
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ data: req.params.id, message: "Admin delete successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
