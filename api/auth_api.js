import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
dotenv.config();

const authApp = express.Router();

//router POST new user
//@access public

authApp.post(
  "/register",
  [
    auth,
    [
      body("name", "name is required").not().isEmpty(),
      body("email", "email is required").not().isEmpty().isEmail(),
      body("password", "password  is required").not().isEmpty().isLength({
        min: 6,
        max: 16,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).json({ error: "User exist" });
      user = new User(req.body);
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(req.body.password, salt);
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

//router POST login user
//@access public

authApp.post(
  "/login",
  [body("email", "email is required").not().isEmpty().isEmail(), body("password", "password is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({
        email: errors.array().find((error) => error.param === "email")?.msg,
        password: errors.array().find((error) => error.param === "password")?.msg,
      });
    try {
      const user = await User.findOne({ email: req.body.email });
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch)
        return res.status(400).json({
          password: "password is wrong",
        });
      jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
        if (err) return res.status(400).json({ error: err });
        res.status(200).json({
          user: user,
          token: token,
        });
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export default authApp;
