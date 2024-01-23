import Certificate from "../model/certificate.js";
import dotenv from "dotenv";
dotenv.config();
const { PAGINATION } = process.env;
export const getCertificates = async (req, res) => {
  let stack = req.params.stack;
  let type = req.params.type;

  let pages = req.query.pages;
  let offset = (pages - 1) * PAGINATION;
  let both = stack !== "default" && type !== "default";

  try {
    const certificates = await Certificate.find(
      both
        ? {
            $and: [{ stacks: { $in: [stack] } }, { types: { $in: [type] } }],
          }
        : stack !== "default"
        ? { stacks: { $in: [stack] } }
        : type !== "default"
        ? { types: { $in: [type] } }
        : null
    )
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "types",
          select: ["enName", "arName", "krName"],
        },
        {
          path: "stacks",
          select: ["enName", "color"],
        },
      ])
      .skip(offset)
      .limit(PAGINATION);
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getCertificate = async (req, res) => {
  try {
    let certificate = await Certificate.findById(req.params.id).populate([
      {
        path: "user",
        select: ["name", "imageURL", "bio"],
      },
      {
        path: "types",
        select: ["enName", "arName", "krName"],
      },
      {
        path: "stacks",
        select: ["enName", "color"],
      },
    ]);

    return res.status(200).json(certificate);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchCertificate = async (req, res) => {
  let search = req.params.search;
  let regex = { $regex: new RegExp(search, "i") };
  try {
    const certificates = await Certificate.find({
      $or: [{ enTitle: regex }, { arTitle: regex }, { krTitle: regex }],
    })
      .populate([
        {
          path: "user",
          select: ["name", "imageURL", "bio"],
        },
        {
          path: "types",
          select: ["enName", "arName", "krName"],
        },
        {
          path: "stacks",
          select: ["enName", "color"],
        },
      ])
      .limit(30);
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create({
      ...req.body,
      user: req.user,
    });
    return res
      .status(200)
      .json({ data: certificate, message: "Certificate added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ data: certificate, message: "Certificate updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      data: req.params.id,
      message: "Certificate delete successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
