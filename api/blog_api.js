import Blog from "../model/blog_model.js";
import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
import { body, validationResult } from "express-validator";
dotenv.config();
const blogApp = express.Router();

//router  GET blogs
//@access public

blogApp.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//router  GET one blog by id
//@access public

blogApp.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(400).json({ error: "blog not exist" });
    res.status(200).json(blog);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(400).json({ error: "object id is not valid" });
    res.status(500).json({ error: error });
  }
});

//router  POST blog
//@access private

blogApp.post(
  "/",
  [
    auth,
    [
      body("enTitle", "title is required").not().isEmpty(),
      body("arTitle", "title is required").not().isEmpty(),
      body("krTitle", "title is required").not().isEmpty(),

      body("enBody", "body is required").not().isEmpty(),
      body("arBody", "body is required").not().isEmpty(),
      body("krBody", "body is required").not().isEmpty(),

      body("image", "image is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    let { enTitle, arTitle, krTitle, enBody, arBody, krBody, image } = req.body;
    try {
      const blog = new Blog({
        user: req.user_id,
        enTitle,
        arTitle,
        krTitle,
        enBody,
        arBody,
        krBody,
        image,
      });
      await blog.save();

      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

//router  PUT blog
//@access private

blogApp.put("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!blog) return res.status(400).json({ error: "blog not exist" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//router  DELETE blog
//@access private

blogApp.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(400).json({ error: "blog not exist" });
    res.status(200).json({ message: "blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default blogApp;
