import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

//@config

export const hashPassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      let salt = await bcrypt.genSalt(16);
      let hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      next();
    } else {
      return res.status(400).json({ error: "Provide password" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const checkBody = (req, res, next) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    } else res.status(400).json({ errors: result.array() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const passwordValidation = (req, res, next) => {
  try {
    if (!req.body?.password || req.body?.password === "")
      return res.status(400).json({
        error: "ووشەی نهێنی پێویستە",
      });
    if (req.body.password.length < 8 || req.body.password.length > 16) {
      return res.status(400).json({
        error: "پێویستە ووشەی نهێنی لە نێوان ٨ بۆ ١٦ پیت و هێمادا بێت",
      });
    }
    if (req.body.password_confirmation) {
      if (req.body.password_confirmation !== req.body.password) {
        return res.status(400).json({
          error: "پێویستە ووشە نهێنیەکان وەک یەک بێت",
        });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const checkEnglishLetter = (req, res, next) => {
  try {
    if (req.body.username) {
      for (const char of req.body.username) {
        if (char === " " || char > "z" || char < "A") {
          return res.status(400).json({
            error: "ناوی بەکارهێنەر پێویستە ئینگلیزی بێت",
          });
        }
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const checkMongooseId = async (id) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return objectId;
  } catch (error) {
    throw Error("ئایدی هەڵەی تێدایە");
  }
};

export const checkNumberFormat = async (req, res, next) => {
  let flag = true;
  if (req.body.price) flag = testNumber(req.body.price);
  if (req.body.discountNumber) flag = testNumber(req.body.discountNumber);

  if (!flag)
    return res
      .status(400)
      .json({ error: "تکایە لە شوێنی ژمارە پیت داغڵ مەکە " });
  next();
};

const testNumber = (number) => {
  return /^[0-9]+(\.[0-9]+)?$/.test(number);
};

export const checkPhoneFormat = async (req, res, next) => {
  let flag = true;
  if (req.body.phone) flag = testPhone(req.body.phone);

  if (!flag)
    return res.status(400).json({
      error:
        "پێویستە لە شوێنی ژمارە تەلەفۆن تەنها ژمارە داغڵ بکەیت و ١١ ژمارە بێت",
    });
  next();
};

const testPhone = (number) => {
  return /^[0-9]{11}$/.test(number);
};
