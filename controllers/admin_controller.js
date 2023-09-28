import { checkBody, checkPassword } from "../functions/check.js";
import {
  generateAdminToken,
  generateHashPassword,
} from "../functions/config.js";
import Admin from "../model/admin_model.js";
import { deleteById } from "../query/delete_data.js";
import { findOneByField, findOneById } from "../query/find_data.js";
import { insertData } from "../query/insert_data.js";
import { updateOneById } from "../query/update_data.js";

export const getToken = async (req, res) => {
  try {
    const admin = await findOneById("admin", Admin, req.admin, false);
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    let admin = await alreadyExistByField(
      `admin`,
      Admin,
      `email`,
      req.body.email
    );

    admin = await insertData(
      `admin`,
      Admin,
      {
        ...req.body,
        password: await generateHashPassword(req.body.password).then((data) => {
          return data;
        }),
      },
      false
    );
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const admin = await findOneByField(
      "admin",
      Admin,
      "email",
      req.body.email,
      false,
      false
    );
    let match = await checkPassword(admin.password, req.body.password);
    if (!match) return res.status(400).json({ error: "Wrong data" });
    let token = await generateAdminToken({ id: admin._id, role: admin.role });
    return res.status(200).json({ admin, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const errors = checkBody(req.body);
    if (errors.length > 0) return res.status(400).json(errors);
    const admin = await updateOneById(
      "admin",
      Admin,
      req.admin,
      req.body,
      false
    );
    return res
      .status(200)
      .json({ data: admin, message: "Admin Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    await deleteById("admin", Admin, req.admin);
    return res.status(200).json(req.params.admin_id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
