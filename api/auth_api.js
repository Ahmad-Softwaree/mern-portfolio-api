import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
dotenv.config();

const authApp = express.Router();

//router POST new user
//@access public

//NOTE => we will do all of these in postman and the admin routes will be private with tokens

authApp.get("/jwt_token", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ error: "user not found" });
    let { password, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authApp.post("/", auth, async (req, res) => {
  try {
    let { name, email, password, image } = req.body;
    if (!name || !email || !password || !image) return res.status(400).json({ error: "Please provide fields" });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User exist" });
    user = new User(req.body);
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//router POST login user
//@access public

authApp.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: "please enter data" });
    const user = await User.findOne({ email: req.body.email });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(400).json({
        error: "password is wrong",
      });
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
      if (err) return res.status(400).json({ error: err });
      return res.status(200).json({
        user: user,
        token: token,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//get all users
authApp.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//update a user
authApp.put("/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.user_id, { $set: req.body }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//delete a user
authApp.delete("/:user_id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.user_id);
    return res.status(200).json(req.params.user_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default authApp;
