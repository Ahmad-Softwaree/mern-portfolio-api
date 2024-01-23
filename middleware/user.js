import jwt from "jsonwebtoken";
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();
const JwtKey = process.env.JWT_SECRET;

const userMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    return res.status(401).json({ message: "Token not found" });

  try {
    const decoded = jwt.decode(token, JwtKey);

    if (!decoded) return res.status(401).json({ message: "User not found" });
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = userId;
    next();
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

export default userMiddleware;
