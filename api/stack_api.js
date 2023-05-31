import Stack from "../model/stack_model.js";
import express from "express";
import auth from "../middleware/auth.js";
const stackApp = express.Router();

stackApp.get("/", auth, async (req, res) => {
  try {
    const stacks = await Stack.find();
    res.status(200).json(stacks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

stackApp.get("/:stack_id", auth, async (req, res) => {
  try {
    const stack = await Stack.findById(req.params.stack_id);
    if (!stack) return res.status(400).json({ error: "There is no such stack" });
    return res.status(200).json(stack);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

stackApp.post("/", auth, async (req, res) => {
  let { name, color } = req.body;
  try {
    if (!name || !color) return res.status(400).json({ error: "please provide all the fields" });
    const stack = new Stack(req.body);
    await stack.save();
    return res.status(200).json(stack);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

stackApp.put("/:stack_id", auth, async (req, res) => {
  try {
    const stack = await Stack.findByIdAndUpdate(req.params.stack_id, { $set: req.body }, { new: true });
    return res.status(200).json(stack);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

stackApp.delete("/:stack_id", auth, async (req, res) => {
  try {
    await Stack.findByIdAndDelete(req.params.stack_id);
    return res.status(200).json(req.params.stack_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default stackApp;
