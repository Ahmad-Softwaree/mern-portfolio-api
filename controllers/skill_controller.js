import { checkBody, countLength } from "../functions/check.js";
import Skill from "../model/skill_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  alreadyExistByField,
  checkIfDataExist,
  checkIfOneDataExist,
  findAll,
  findOneByField,
  findOneById,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { skillPopulation } from "../query/populations.js";
import { updateOneByField, updateOneById } from "../query/update_data.js";

export const getAllSkills = async (req, res) => {
  try {
    const skills = await findAll(
      "skill",
      Skill,
      true,
      skillPopulation(true),
      "",
      0,
      { sequence: 1 }
    );
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
    let length = await countLength(Skill);
    const skill = await insertData(
      "skill",
      Skill,
      { ...req.body, admin: req.admin, sequence: length + 1 },
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
    let pre = await findOneById("skill", Skill, req.params.skill_id);
    let check = await checkIfOneDataExist(
      "skill",
      Skill,
      "sequence",
      req.body.sequence,
      false
    );
    if (!check) return res.status(400).json({ error: "skill not found" });
    if (check) {
      var pro = await findOneByField(
        "skill",
        Skill,
        "sequence",
        req.body.sequence,
        false
      );
    }
    let data = [];
    if (pre !== pro && check) {
      let skills = await findAll("skill", Skill, true, skillPopulation(true));
      for (const val of skills) {
        if (val.sequence >= pro.sequence && val.sequence < pre.sequence) {
          val.sequence++;
          data.push(val);
        } else if (
          val.sequence > pre.sequence &&
          val.sequence <= pro.sequence
        ) {
          data.push(val);
          val.sequence--;
        }
        await val.save();
      }
    }
    const skill = await updateOneById(
      "skill",
      Skill,
      req.params.skill_id,
      { ...req.body, admin: req.admin },
      true,
      skillPopulation(true)
    );
    data.push(skill);
    return res
      .status(200)
      .json({ data, message: "Skill Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await deleteById("skill", Skill, req.params.skill_id);
    return res.status(200).json({
      data: req.params.skill_id,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
