import express from "express";
import auth from "../middleware/auth.js";
import Work from "../model/work_model.js";

const workApp = express.Router();

//route GET all works
//@access public

workApp.get("/", async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json(works);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router GET one work
//@access public

workApp.get("/:work_id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.work_id);
    if (!work) return res.status(400).json({ error: "work not find" });
    return res.status(200).json(work);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(500).json({ error: "Object Id error" });
    return res.status(500).json({ error: error.message });
  }
});

//router POST work
//@access private

workApp.post("/", auth, async (req, res) => {
  let { enTitle, arTitle, krTitle, company, image, from, to } = req.body;
  if (!enTitle || !arTitle || !krTitle || !company || !image || !from) return res.status(400).json({ error: "Please provide data" });
  try {
    const work = new Work(req.body);
    work.user = req.user.id;
    await work.save();
    res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//route PUT work
//@access private

workApp.put("/:work_id", auth, async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.work_id, { $set: req.body });
    if (!work) return res.status(400).json({ error: "work is not exist" });
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//route DELETE work
//@access private

workApp.delete("/:work_id", auth, async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.work_id);
    if (!work) return res.status(400).json({ error: "work is not exist" });
    return res.status(200).json(req.params.work_id);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default workApp;
