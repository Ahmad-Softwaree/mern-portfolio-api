import Blog from "../model/blog_model.js";
import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
import { body, validationResult } from "express-validator";
dotenv.config();
const blogApp = express.Router();

//router  GET blogs
//@access public

blogApp.get("/home", async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ _id: -1 })
      .limit(10)
      .populate([
        {
          path: "user",
          select: ["name", "image"],
        },
      ]);
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

blogApp.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  GET one blog by id
//@access public

blogApp.get("/one/:blog_id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blog_id);
    if (!blog) return res.status(400).json({ error: "blog not exist" });
    return res.status(200).json(blog);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(400).json({ error: "object id is not valid" });
    return res.status(500).json({ error: error.message });
  }
});

//router  POST blog
//@access private

blogApp.post("/:user_id", auth, async (req, res) => {
  let { enTitle, arTitle, krTitle, enBody, arBody, krBody, image } = req.body;
  if (!enTitle || !arTitle || !krTitle || !enBody || !krBody || !arBody || !image)
    return res.status(400).json({ error: "please provide all the fields" });
  try {
    const blog = new Blog(req.body);
    blog.user = req.user.id;
    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  PUT blog
//@access private

blogApp.put("/:blog_id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.blog_id, { $set: req.body }, { new: true });
    if (!blog) return res.status(400).json({ error: "blog not exist" });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//router  DELETE blog
//@access private

blogApp.delete("/:blog_id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.blog_id);
    if (!blog) return res.status(400).json({ error: "blog not exist" });
    return res.status(200).json(req.params.blog_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default blogApp;
