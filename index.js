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

import skillData from "./portfolio.skills.json" assert { type: "json" };

import mongoose from "mongoose";
import Project from "./model/project.js";
import Skill from "./model/skill.js";

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

app.get("/api/test", async (req, res) => {
  try {
    for (let val of skillData) {
      await Skill.create({
        user: mongoose.Types.ObjectId("65ad42fc08fa262b2b80d4c2"),
        sequence: val.sequence,
        name: val.name,
        imageName: val.imageName,
        imageURL: val.imageURL,
        types: val.types.map((val) => val.type.$oid),
      });
    }

    res.send("done");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
