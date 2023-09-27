import { checkBody } from "../functions/check.js";
import Work from "../model/work_model.js";
import { deleteById } from "../query/delete_data.js";
import { findAll, findOneById } from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { updateOneById } from "../query/update_data.js";

export const getAllWorks = async (req, res) => {
  try {
    const works = await findAll("work", Work, false);
    return res.status(200).json(works);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneWork = async (req, res) => {
  try {
    const work = await findOneById("work", Work, req.params.work_id, false);
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addWork = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const work = await insertData("work", Work, req.body, false);
    return res
      .status(200)
      .json({ data: work, message: "Work Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateWork = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const work = await updateOneById(
      "work",
      Work,
      req.params.work_id,
      req.body,
      false
    );
    return res
      .status(200)
      .json({ data: work, message: "Work Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteWork = async (req, res) => {
  try {
    await deleteById("work", Work, req.params.work_id);
    return res.status(200).json(req.params.work_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
