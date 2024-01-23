import Skill from "../model/skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate([
      {
        path: "types",
        select: ["enName", "arName", "krName", "color"],
      },
    ]);
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate([
      {
        path: "types",
        select: ["enName", "arName", "krName", "color"],
      },
    ]);
    return res.status(200).json(skill);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    return res
      .status(200)
      .json({ data: skill, message: "Skill Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ data: skill, message: "Skill Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      data: req.params.skill_id,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
