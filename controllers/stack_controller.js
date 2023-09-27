import { checkBody } from "../functions/check.js";
import Certificate from "../model/certificate_model.js";
import Project from "../model/project_model.js";
import Stack from "../model/stack_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  alreadyExistByField,
  findAll,
  findOneById,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { updateOneById } from "../query/update_data.js";

export const getAllStacks = async (req, res) => {
  try {
    const stacks = await findAll("stack", Stack, false);
    return res.status(200).json(stacks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneStack = async (req, res) => {
  try {
    console.log(req.params);
    const stack = await findOneById("stack", Stack, req.params.stack_id, false);
    return res.status(200).json(stack);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addStack = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    await alreadyExistByField("stack", Stack, "name", req.body.name);
    const stack = await insertData("stack", Stack, req.body, false);
    return res
      .status(200)
      .json({ data: stack, message: "Stack Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateStack = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const stack = await updateOneById(
      "stack",
      Stack,
      req.params.stack_id,
      req.body,
      false
    );
    return res
      .status(200)
      .json({ data: stack, message: "Stack Update Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteStack = async (req, res) => {
  try {
    let certificates = await findAll("certificate", Certificate, false);
    let projects = await findAll("project", Project, false);
    for (const val of certificates) {
      if (
        val.stacks.find(
          (val) => val.stack.toString() === req.params.stack_id.toString()
        )
      ) {
        return res.status(400).json({ error: "Stack Used In Certifications" });
      }
    }

    for (const val of projects) {
      if (
        val.stacks.find(
          (val) => val.stack.toString() === req.params.stack_id.toString()
        )
      ) {
        return res.status(400).json({ error: "Stack Used In Projects" });
      }
    }

    await deleteById("stack", Stack, req.params.stack_id);
    return res.status(200).json({
      data: req.params.stack_id,
      message: "Stack Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
