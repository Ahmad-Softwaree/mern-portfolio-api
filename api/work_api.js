import express from "express";
import { body, validationResult } from "express-validator";
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
    return res.status(500).json({ error: error });
  }
});

//router GET one work
//@access public

workApp.get("/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(400).json({ error: "work not find" });
    res.status(200).json(work);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(500).json({ error: "Object Id error" });
    return res.status(500).json({ error: error });
  }
});

//router POST work
//@access private

workApp.post(
  "/",
  [
    auth,
    [
      body("enTitle", "title is required").not().isEmpty(),
      body("arTitle", "title is required").not().isEmpty(),
      body("krTitle", "title is required").not().isEmpty(),
      body("companyName", "title is required").not().isEmpty(),
      body("image", "title is required").not().isEmpty(),
      body("from", "title is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newWork = new Work(req.body);
      await newWork.save();
      res.status(200).json(newWork);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

//route PUT work
//@access private

workApp.put("/:id", auth, async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, { $set: req.body });
    if (!work) return res.status(400).json({ error: "work is not exist" });
    res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//route DELETE work
//@access private

workApp.delete("/:id", auth, async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) return res.status(400).json({ error: "work is not exist" });
    res.status(200).json({ msg: "work deleted" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default workApp;
