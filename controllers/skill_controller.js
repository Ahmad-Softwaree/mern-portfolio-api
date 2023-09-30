import { checkBody } from "../functions/check.js";
import Skill from "../model/skill_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  alreadyExistByField,
  findAll,
  findOneById,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { skillPopulation } from "../query/populations.js";
import { updateOneById } from "../query/update_data.js";

export const getAllSkills = async (req, res) => {
  try {
    const skills = await findAll("skill", Skill, true, skillPopulation(true));
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneSkill = async (req, res) => {
  try {
    const skill = await findOneById(
      "skill",
      Skill,
      req.params.skill_id,
      true,
      skillPopulation(true)
    );
    return res.status(200).json(skill);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addSkill = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    await alreadyExistByField("skill", Skill, "name", req.body.name);
    const skill = await insertData(
      "skill",
      Skill,
      { ...req.body, admin: req.admin },
      true,
      skillPopulation(true)
    );
    return res
      .status(200)
      .json({ data: skill, message: "Skill Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const skill = await updateOneById(
      "skill",
      Skill,
      req.params.skill_id,
      { ...req.body, admin: req.admin },
      true,
      skillPopulation(true)
    );
    return res
      .status(200)
      .json({ data: skill, message: "Skill Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await deleteById("skill", Skill, req.params.skill_id);
    return res.status(200).json(req.params.skill_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
