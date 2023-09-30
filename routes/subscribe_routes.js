import express from "express";
import admin_middleware from "../middleware/admin_middleware.js";

import {
  addSubscribe,
  deleteSubscribe,
  getAllSubscribes,
} from "../controllers/subscribe_controller.js";

const subscribeRouter = express.Router();

subscribeRouter.get("/", getAllSubscribes);

subscribeRouter.post("/", addSubscribe);

subscribeRouter.delete("/:subscribe_id", admin_middleware, deleteSubscribe);

export default subscribeRouter;
