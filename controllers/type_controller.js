import { checkBody } from "../functions/check.js";
import Blog from "../model/blog_model.js";
import Certificate from "../model/certificate_model.js";
import Project from "../model/project_model.js";
import Skill from "../model/skill_model.js";
import Type from "../model/type_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  alreadyExistByThreeField,
  findAll,
  findOneById,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { blogPopulation } from "../query/populations.js";
import { selectData } from "../query/selectData.js";
import { updateOneById } from "../query/update_data.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await findAll("type", Type, false);
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneType = async (req, res) => {
  try {
    const type = await findOneById("type", Type, req.params.type_id, false);
    return res.status(200).json(type);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addType = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    await alreadyExistByThreeField(
      "type",
      Type,
      "enName",
      req.body.enName,
      false,
      "arName",
      req.body.arName,
      false,
      "krName",
      req.body.krName,
      false,
      "or"
    );
    const type = await insertData("type", Type, req.body, false);
    return res
      .status(200)
      .json({ data: type, message: "Type added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateType = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const type = await updateOneById(
      "type",
      Type,
      req.params.type_id,
      req.body,
      false
    );
    return res
      .status(200)
      .json({ data: type, message: "Type Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteType = async (req, res) => {
  try {
    let certificates = await findAll("certificate", Certificate, false);
    let projects = await findAll("project", Project, false);
    let skills = await findAll("skill", Skill, false);

    for (const val of certificates) {
      if (
        val.types.find(
          (val) => val.type.toString() === req.params.type_id.toString()
        )
      ) {
        return res.status(400).json({ error: "Stack Used In Certifications" });
      }
    }

    for (const val of projects) {
      if (
        val.types.find(
          (val) => val.type.toString() === req.params.type_id.toString()
        )
      ) {
        return res.status(400).json({ error: "Stack Used In Projects" });
      }
    }

    for (const val of skills) {
      if (val.type.toString() === req.params.type_id.toString()) {
        return res.status(400).json({ error: "Stack Used In Skills" });
      }
    }

    await deleteById("type", Type, req.params.type_id);
    return res.status(200).json({
      data: req.params.type_id,
      message: "Type Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
