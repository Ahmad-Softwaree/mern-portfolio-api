import bcrypt from "bcrypt";
import { generateToken } from "../lib/functions/functions.js";
import User from "../model/user.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(400).json({ error: "user not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    console.log(req.body.password);

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      return res.status(200).json({
        user,
        token: await generateToken({ id: user.id, role: user.role }),
      });
    } else return res.status(400).json({ error: "email or password is wrong" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    let user = await User.create(req.body);
    return res.status(200).json({
      user,
      token: await generateToken({ id: user.id, role: user.role }),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
