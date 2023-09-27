import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";
import {
  addBlog,
  blogSearch,
  deleteBlog,
  getAllBlogs,
  getBlogsByCategory,
  getHomeBlogs,
  getOneBlog,
  getPanelBlogs,
  getRandomBlogs,
  updateBlog,
} from "../controllers/blog_controller.js";

const blogRouter = express.Router();

blogRouter.get("/home", getHomeBlogs);

blogRouter.get("/all", getAllBlogs);
blogRouter.get("/random", getRandomBlogs);

blogRouter.get("/:search", blogSearch);

blogRouter.get("/panel", admin_middleware, getPanelBlogs);

blogRouter.get("/one/:blog_id", getOneBlog);

blogRouter.get("/category/:category_id", getBlogsByCategory);

blogRouter.post("/", admin_middleware, addBlog);

blogRouter.put("/:blog_id", admin_middleware, updateBlog);

blogRouter.delete("/:blog_id", admin_middleware, deleteBlog);

export default blogRouter;
