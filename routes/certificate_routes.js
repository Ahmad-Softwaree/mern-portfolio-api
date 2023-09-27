import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";
import {
  addCertificate,
  certificateSearch,
  deleteCertificate,
  getAllCertificates,
  getCertificatesByStack,
  getHomeCertificates,
  getOneCertificate,
  getPanelCertificates,
  getRandomCertificates,
  updateCertificate,
  getCertificatesByType,
} from "../controllers/certificate_controller.js";

const certificateRouter = express.Router();

certificateRouter.get("/home", getHomeCertificates);

certificateRouter.get("/all", getAllCertificates);
certificateRouter.get("/random", getRandomCertificates);

certificateRouter.get("/:search", certificateSearch);

certificateRouter.get("/panel", admin_middleware, getPanelCertificates);

certificateRouter.get("/one/:certificate_id", getOneCertificate);

certificateRouter.get("/stack/:stack_id", getCertificatesByStack);
certificateRouter.get("/type/:type_id", getCertificatesByType);

certificateRouter.post("/", admin_middleware, addCertificate);

certificateRouter.put("/:certificate_id", admin_middleware, updateCertificate);

certificateRouter.delete(
  "/:certificate_id",
  admin_middleware,
  deleteCertificate
);

export default certificateRouter;
