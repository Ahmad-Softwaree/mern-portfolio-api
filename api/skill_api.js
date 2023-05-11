import Skill from "../model/skill_model.js";
import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
dotenv.config();
const skillApp = express.Router();

//router  GET Skills
//@access public

skillApp.get("/home", async (req, res) => {
  try {
    const skills = await Skill.find({})
      .sort({ _id: -1 })
      .limit(10)
      .populate([
        {
          path: "user",
          select: ["name", "image"],
        },
      ]);
    return res.status(200).json(skills);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

skillApp.get("/all", async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//route POST category
//@Ahmad-Softwaree

skillApp.post("/category/:user_id", auth, async (req, res) => {
  let { header } = req.body;
  if (!header) return res.status(400).json({ error: "please provide header" });

  try {
    let skill = await Skill.findOne({});
    if (!skill) skill = new Skill({ user: req.user.id });
    skill.categories.push({ header, skills: [] });
    await skill.save();
    return res.status(200).json(skill);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router update category

skillApp.put("/category/:category_id/:user_id", auth, async (req, res) => {
  let { header } = req.body;
  if (!header) return res.status(400).json({ error: "please provide header" });
  try {
    let skill = await Skill.findOne({});
    skill.categories.find((category) => category._id.toString() === req.params.category_id).header = header;
    await skill.save();
    return res.status(200).json({ category_id: req.params.category_id, header });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router delete category

skillApp.delete("/category/:category_id/:user_id", auth, async (req, res) => {
  try {
    let skill = await Skill.findOne({});
    skill.categories = skill.categories.filter((category) => category._id.toString() !== req.params.category_id);
    await skill.save();
    return res.status(200).json(req.params.category_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  POST Skill
//@access private

skillApp.post("/skill/:category_id/:user_id", auth, async (req, res) => {
  let { enTitle, arTitle, krTitle, image } = req.body;
  if (!enTitle || !arTitle || !krTitle || !image) return res.status(400).json({ error: "please provide all the fields" });
  try {
    let skill = await Skill.findOne({});
    skill.categories.find((category) => category._id.toString() === req.params.category_id).skills.push(req.body);
    return res.status(200).json({ category_id: req.params.category_id, skill: req.body });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  PUT Skill
//@access private

// skillApp.put("/:category_id/:skill_id", auth, async (req, res) => {
//     let { enTitle, arTitle, krTitle, image } = req.body;
//     if (!enTitle || !arTitle || !krTitle || !image) return res.status(400).json({ error: "please provide all the fields" });
//   try {
//     const skill = await Skill.findOne({});
//     skill.categories.find(category => category._id.toString() === req.params.category_id).skills.find(skill => skill._id.toString() === req.params.skill_id) = req.body;
//     return res.status(200).json({category_id: req.params.category_id,skill_id: req.params.skill_id,skill: req.body});
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

//router  DELETE Skill
//@access private

skillApp.delete("/:skill_id", auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.skill_id);
    if (!skill) return res.status(400).json({ error: "skill not exist" });
    return res.status(200).json(req.params.skill_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default skillApp;
