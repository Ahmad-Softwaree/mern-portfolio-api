import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "UnAuthorized user" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) return res.status(401).json({ error: "UnAuthorized user" });
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export default auth;
