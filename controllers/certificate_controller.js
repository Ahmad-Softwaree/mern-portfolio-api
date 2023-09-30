import { checkBody } from "../functions/check.js";
import Certificate from "../model/certificate_model.js";
import { deleteById } from "../query/delete_data.js";
import {
  alreadyExistByThreeField,
  findAll,
  findManyByThreeField,
  findOneById,
  findRandomly,
} from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { certificatePopulation } from "../query/populations.js";
import { updateOneById } from "../query/update_data.js";

export const getHomeCertificates = async (req, res) => {
  try {
    const certificates = await findAll(
      "certificate",
      Certificate,
      true,
      certificatePopulation(true),
      "",
      10,
      { _id: -1 }
    );
    return res.status(200).json(certificates);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await findAll(
      "certificate",
      Certificate,
      true,
      certificatePopulation(true)
    );
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRandomCertificates = async (req, res) => {
  try {
    const certificates = await findRandomly(
      "certificate",
      Certificate,
      true,
      certificatePopulation(true),
      "",
      5
    );
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPanelCertificates = async (req, res) => {
  try {
    const certificates = await findAll(
      "certificate",
      Certificate,
      true,
      certificatePopulation(true),
      ""
    );
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneCertificate = async (req, res) => {
  try {
    const certificate = await findOneById(
      "certificate",
      Certificate,
      req.params.certificate_id,
      true,
      certificatePopulation(true),
      ""
    );
    return res.status(200).json(certificate);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json({ error: "object id is not valid" });
    return res.status(500).json({ error: error.message });
  }
};

export const getCertificatesByStack = async (req, res) => {
  try {
    let certificates = await findAll(
      "certificate",
      Certificate,
      true,
      certificatePopulation(true),
      ""
    );
    certificates = certificates.filter((val) =>
      val.stacks.find((one) => one.stack._id.toString() === req.params.stack_id)
    );
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCertificatesByType = async (req, res) => {
  try {
    let certificates = await findAll(
      "certificate",
      Certificate,
      true,
      certificatePopulation(true),
      ""
    );
    certificates = certificates.filter((val) =>
      val.types.find((one) => one.type._id.toString() === req.params.type_id)
    );
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const certificateSearch = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    let certificates = await findManyByThreeField(
      "certificate",
      Certificate,
      "enTitle",
      req.params.search,
      false,
      "arTitle",
      req.params.search,
      false,
      "krTitle",
      req.params.search,
      false,
      "or",
      true,
      certificatePopulation(true)
    );
    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addCertificate = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    await alreadyExistByThreeField(
      "certificate",
      Certificate,
      "enTitle",
      req.body.enTitle,
      false,
      "arTitle",
      req.body.arTitle,
      false,
      "krTitle",
      req.body.krTitle,
      false,
      "or"
    );
    const certificate = await insertData(
      "certificate",
      Certificate,
      { ...req.body, admin: req.admin },
      true,
      certificatePopulation(true)
    );
    return res
      .status(200)
      .json({ data: certificate, message: "certificate added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const certificate = await updateOneById(
      "certificate",
      Certificate,
      req.params.certificate_id,
      { ...req.body, admin: req.admin },
      true,
      certificatePopulation(true)
    );
    return res
      .status(200)
      .json({ data: certificate, message: "Certificate Update Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    await deleteById("certificate", Certificate, req.params.certificate_id);
    return res.status(200).json({
      data: req.params.certificate_id,
      message: "certificate deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
