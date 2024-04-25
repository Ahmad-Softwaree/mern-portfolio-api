import Blog from "../model/blog.js";
import dotenv from "dotenv";
dotenv.config();
const { PAGINATION } = process.env;
export const getBlogs = async (req, res) => {
  let category = req.params.category;
  let pages = req.query.pages;
  let offset = (pages - 1) * PAGINATION;
  try {
    let blogs = await Blog.find(
      category !== "default" ? { categories: { $in: [category] } } : null
    )
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "categories",
          select: ["enName", "arName", "krName"],
        },
      ])

      .skip(offset)
      .limit(PAGINATION);

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getRelatedBlogs = async (req, res) => {
  let category = req.params.category;
  try {
    let blogs = await Blog.find({
      $and: [
        {
          categories: { $in: [category] },
        },
        {
          _id: { $ne: req.params.id },
        },
      ],
    })
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "categories",
          select: ["enName", "arName", "krName"],
        },
      ])
      .limit(3);

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id).populate([
      {
        path: "user",
        select: ["name", "imageURL", "bio"],
      },
      {
        path: "categories",
        select: ["enName", "arName", "krName"],
      },
    ]);

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchBlog = async (req, res) => {
  let search = req.query.search;
  let regex = { $regex: new RegExp(search, "i") };
  try {
    const blogs = await Blog.find({
      $or: [{ enTitle: regex }, { arTitle: regex }, { krTitle: regex }],
    })
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "categories",
          select: ["enName", "arName", "krName"],
        },
      ])

      .limit(30);
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, user: req.user });
    return res
      .status(200)
      .json({ data: blog, message: "Blog added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ data: blog, message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ data: req.params.id, message: "Blog delete successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
