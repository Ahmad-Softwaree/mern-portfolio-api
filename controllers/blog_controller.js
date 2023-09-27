import { checkBody } from "../functions/check.js";
import Blog from "../model/blog_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  findAll,
  findManyByThreeField,
  findOneById,
  findRandomly,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { blogPopulation } from "../query/populations.js";
import { updateOneById } from "../query/update_data.js";

export const getHomeBlogs = async (req, res) => {
  try {
    const blogs = await findAll(
      "blog",
      Blog,
      true,
      blogPopulation(true),
      "",
      10,
      { _id: -1 }
    );
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await findAll("blog", Blog, true, blogPopulation(true));
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandomBlogs = async (req, res) => {
  try {
    const blogs = await findRandomly(
      "blog",
      Blog,
      true,
      blogPopulation(true),
      "",
      5
    );
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPanelBlogs = async (req, res) => {
  try {
    const blogs = await findAll("blog", Blog, true, blogPopulation(true), "");
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneBlog = async (req, res) => {
  try {
    const blog = await findOneById(
      "blog",
      Blog,
      req.params.blog_id,
      true,
      blogPopulation(true),
      ""
    );
    return res.status(200).json(blog);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json({ error: "object id is not valid" });
    return res.status(500).json({ error: error.message });
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    let blogs = await findAll("blog", Blog, true, blogPopulation(true), "");
    blogs = blogs.filter((val) =>
      val.categories.find(
        (one) => one.category._id.toString() === req.params.category_id
      )
    );
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const blogSearch = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    let blogs = await findManyByThreeField(
      "blog",
      Blog,
      "enTitle",
      req.params.search,
      false,
      "arTitle",
      req.params.search,
      false,
      "krTitle",
      req.params.search,
      false,
      "or",
      true,
      blogPopulation(true)
    );
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addBlog = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const blog = await insertData(
      "blog",
      Blog,
      { ...req.body, admin: req.admin },
      false
    );
    return res
      .status(200)
      .json({ data: blog, message: "blog added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const blog = await updateOneById(
      "blog",
      Blog,
      req.params.blog_id,
      req.body,
      false
    );
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await deleteById("blog", Blog, req.params.blog_id);
    return res.status(200).json(req.params.blog_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
