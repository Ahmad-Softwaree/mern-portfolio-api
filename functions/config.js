import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;
export const generateHashPassword = async (password) => {
  try {
    let salt = await bcrypt.genSalt(16);
    let hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const generateAdminToken = async (value) => {
  const token = await jwt.sign({ id: value.id, role: value.role }, JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
