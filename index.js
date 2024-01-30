import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import connectDb from "./lib/database/mongoose.js";
import blogRouter from "./routes/blog.js";
import configRouter from "./routes/config.js";

import certificateRouter from "./routes/certificate.js";
import userRouter from "./routes/user.js";
import projectRouter from "./routes/project.js";
import subscribeRouter from "./routes/subscribe.js";
import workRouter from "./routes/work.js";
import skillRouter from "./routes/skill.js";

dotenv.config();
const app = express();

//app config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    optionsSuccessStatus: 200,
  })
);

//use routes

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/project", projectRouter);

app.use("/api/config", configRouter);
app.use("/api/user", userRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/work", workRouter);
app.use("/api/skill", skillRouter);

app.use("/api/certificate", certificateRouter);

//connect db
connectDb();

app.listen(process.env.PORT || 3001, () => {
  console.log("Ahmad Software server is running");
});
