import { deleteUser, getUsers, updateUser } from "../controllers/user.js";
import {
  checkBody,
  checkEnglishLetter,
  hashPassword,
  passwordValidation,
} from "../middleware/validation/validation.js";
import userMiddleware from "./../middleware/user.js";
import express from "express";
import { body } from "express-validator";

const userRouter = express.Router();
//get all users
userRouter.get("/", getUsers);

//update a user
userRouter.put(
  "/:id",
  userMiddleware,
  body("name", "name is required").notEmpty().exists(),
  body("email", "email is required").notEmpty().exists().isEmail(),
  body("password", "password is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("bio", "bio is required").notEmpty().exists(),
  body("url", "url is required").notEmpty().exists(),

  checkBody,
  checkEnglishLetter,
  passwordValidation,
  hashPassword,
  updateUser
);

//delete a user
userRouter.delete("/:id", userMiddleware, deleteUser);
export default userRouter;
