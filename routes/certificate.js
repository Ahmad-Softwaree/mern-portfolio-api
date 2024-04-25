import {
  addCertificate,
  deleteCertificate,
  getCertificate,
  getCertificates,
  searchCertificate,
  updateCertificate,
} from "../controllers/certificate.js";
import { checkBody } from "../middleware/validation/validation.js";
import userMiddleware from "./../middleware/user.js";
import express from "express";
import { body } from "express-validator";

const certificateRouter = express.Router();
certificateRouter.get("/search", searchCertificate);
certificateRouter.get("/one/:id", getCertificate);

certificateRouter.get("/:stack/:type", getCertificates);

certificateRouter.post(
  "/",
  userMiddleware,
  body("enTitle", "enTitle is required").notEmpty().exists(),
  body("arTitle", "arTitle is required").notEmpty().exists(),
  body("krTitle", "krTitle is required").notEmpty().exists(),

  body("enDesc", "enDesc is required").notEmpty().exists(),
  body("arDesc", "arDesc is required").notEmpty().exists(),
  body("krDesc", "krDesc is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("stacks", "stacks is required").notEmpty().exists(),
  body("types", "types is required").notEmpty().exists(),
  body("url", "url is required").notEmpty().exists(),
  body("date", "date is required").notEmpty().exists(),

  checkBody,

  addCertificate
);

//update a user
certificateRouter.put(
  "/:id",
  userMiddleware,
  body("enTitle", "enTitle is required").notEmpty().exists(),
  body("arTitle", "arTitle is required").notEmpty().exists(),
  body("krTitle", "krTitle is required").notEmpty().exists(),

  body("enDesc", "enDesc is required").notEmpty().exists(),
  body("arDesc", "arDesc is required").notEmpty().exists(),
  body("krDesc", "krDesc is required").notEmpty().exists(),
  body("imageName", "imageName is required").notEmpty().exists(),
  body("imageURL", "imageURL is required").notEmpty().exists(),
  body("stacks", "stacks is required").notEmpty().exists(),
  body("types", "types is required").notEmpty().exists(),
  body("url", "url is required").notEmpty().exists(),
  body("date", "date is required").notEmpty().exists(),

  checkBody,

  updateCertificate
);

//delete a user
certificateRouter.delete("/:id", userMiddleware, deleteCertificate);
export default certificateRouter;
