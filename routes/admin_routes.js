import express from "express";
import {
  adminLogin,
  adminRegister,
  deleteAdmin,
  getToken,
  updateAdmin,
} from "../controllers/admin_controller.js";
import admin_middleware from "../middleware/admin_middleware.js";

const adminRouter = express.Router();

adminRouter.get("/jwt_token", admin_middleware, getToken);

adminRouter.post("/", admin_middleware, adminRegister);

adminRouter.post("/login", adminLogin);

adminRouter.put("/:admin_id", admin_middleware, updateAdmin);

adminRouter.delete("/:admin_id", admin_middleware, deleteAdmin);

export default adminRouter;
