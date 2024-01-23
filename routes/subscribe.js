import express from "express";
import { addSubscriber, getSubscribers } from "../controllers/subscribe.js";
import { body } from "express-validator";
import { checkBody } from "../middleware/validation/validation.js";
import userMiddleware from "../middleware/user.js";
const subscribeRouter = express.Router();

//get all subscribed email

subscribeRouter.get("/", userMiddleware, getSubscribers);

//post a new email

subscribeRouter.post(
  "/",
  body("email", "email is required").exists().notEmpty().isEmail(),
  checkBody,
  addSubscriber
);

export default subscribeRouter;
