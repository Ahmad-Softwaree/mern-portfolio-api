import User from "../model/user_model.js";
import express from "express";
import auth from "../middleware/auth.js";
import bcrypt from "bcrypt";
const userApp = express.Router();

//router  GET users
//@access private

userApp.get("/", auth, async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

//router PUT user
//@access private

userApp.put("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user_id);
    if (!user) return res.status(400).json({ error: "there is no user" });
    if (req.body.password) {
      const salt = await bcrypt.genSalt(15);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    user = await User.findByIdAndUpdate(req.user_id, { $set: req.body }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//router DELETE user
//@access private

userApp.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user_id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default userApp;
