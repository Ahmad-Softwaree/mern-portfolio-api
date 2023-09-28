import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findOneById } from "../query/find_data.js";
import Admin from "../model/admin_model.js";
const { JWT_SECRET } = process.env;
dotenv.config();

const admin_middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null)
      return res.status(401).json({ error: "تۆکن بوونی نیە" });
    const decoded = jwt.decode(token, JWT_SECRET);
    if (!decoded) return res.status(400).json({ error: "There is no admin" });

    const adminId = decoded.id;
    let admin = await findOneById("admin", Admin, adminId);
    if (admin === null) {
      res.status(400).json({ error: "There is no admin" });
      next();
    } else {
      req.admin = adminId;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default admin_middleware;
