import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "UnAuthorized user" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decode.id;
    const user = await User.findById(req.user_id);
    if (!user) return res.status(401).json({ error: "UnAuthorized user" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "UnAuthorized user" });
  }
};

export default auth;
