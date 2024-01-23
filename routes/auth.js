import express from "express";
import userMiddleware from "../middleware/user.js";
import { getCurrentUser, login, register } from "../controllers/auth.js";
import { body } from "express-validator";
import {
  checkBody,
  checkEnglishLetter,
  hashPassword,
  passwordValidation,
} from "../middleware/validation/validation.js";
const authRouter = express.Router();

authRouter.get("/current", userMiddleware, getCurrentUser);

//login route
authRouter.post(
  "/login",
  body("email", "email is required").notEmpty().isEmail().exists(),
  body("password", "password is required").exists().notEmpty(),
  checkBody,
  login
);

//register route
authRouter.post(
  "/register",
  //userMiddleware,
  body("email", "email is required", "email", "email is required")
    .exists()
    .notEmpty()
    .isEmail(),
  body("password", "password is required").exists().notEmpty(),
  body("name", "name is required").exists().notEmpty(),
  body("imageName", "imageName is required").exists().notEmpty(),
  body("imageURL", "imageURL is required").exists().notEmpty(),
  checkBody,
  checkEnglishLetter,
  passwordValidation,
  hashPassword,
  register
);

export default authRouter;
