import { checkBody } from "../functions/check.js";
import Subscribe from "../model/subscribe_model.js";
import { deleteById } from "../query/delete_data.js";
import { alreadyExistByField, findAll } from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";

export const getAllSubscribes = async (req, res) => {
  try {
    const subscribes = await findAll("subscribe", Subscribe, false);
    return res.status(200).json(subscribes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addSubscribe = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    await alreadyExistByField("subscribe", Subscribe, "email", req.body.email);

    const subscribe = await insertData("subscribe", Subscribe, req.body, false);
    return res
      .status(200)
      .json({ data: subscribe, message: "You have subscribed Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSubscribe = async (req, res) => {
  try {
    await deleteById("subscribe", Subscribe, req.params.subscribe_id);
    return res.status(200).json({
      data: req.params.subscribe_id,
      message: "Subscribe deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
