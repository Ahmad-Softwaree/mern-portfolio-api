import bcrypt from "bcrypt";
import mongoose from "mongoose";
//@config

//check req.body datas
export const checkBody = (body) => {
  let errors = [];
  for (const [key, value] of Object.entries(body)) {
    if (value === "") {
      errors.push({
        key,
        value: `${key} required`,
      });
    }
  }
  return errors;
};

//check password

export const checkPassword = async (hash, password) => {
  return await bcrypt.compare(password, hash);
};

export const checkMongooseId = async (id) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return objectId;
  } catch (error) {
    throw Error("ئایدی هەڵەی تێدایە");
  }
};

export const countLength = async (schema) => {
  return await schema.countDocuments();
};
