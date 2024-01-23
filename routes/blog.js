import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getRelatedBlogs,
  searchBlog,
  updateBlog,
} from "../controllers/blog.js";
import { checkBody } from "../middleware/validation/validation.js";
import userMiddleware from "./../middleware/user.js";
import express from "express";
import { body } from "express-validator";

const blogRouter = express.Router();
blogRouter.get("/search/:search", searchBlog);

blogRouter.get("/:category", getBlogs);
blogRouter.get("/related/:category/:id", getRelatedBlogs);

blogRouter.get("/one/:id", getBlog);

blogRouter.post(
  "/",
  userMiddleware,
  body("enTitle", "enTitle is required").notEmpty().exists(),
  body("arTitle", "arTitle is required").notEmpty().exists(),
  body("krTitle", "krTitle is required").notEmpty().exists(),

  body("enBody", "enBody is required").notEmpty().exists(),
  body("arBody", "arBody is required").notEmpty().exists(),
  body("krBody", "krBody is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("categories", "categories is required").notEmpty().exists(),

  checkBody,

  addBlog
);

//update a user
blogRouter.put(
  "/:id",
  userMiddleware,
  body("enTitle", "enTitle is required").notEmpty().exists(),
  body("arTitle", "arTitle is required").notEmpty().exists(),
  body("krTitle", "krTitle is required").notEmpty().exists(),

  body("enBody", "enBody is required").notEmpty().exists(),
  body("arBody", "arBody is required").notEmpty().exists(),
  body("krBody", "krBody is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("categories", "categories is required").notEmpty().exists(),

  checkBody,

  updateBlog
);

//delete a user
blogRouter.delete("/:id", userMiddleware, deleteBlog);
export default blogRouter;
