import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database.js";
import authApp from "./api/auth_api.js";
import userApp from "./api/user_api.js";
import blogApp from "./api/blog_api.js";
import projectApp from "./api/project_api.js";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

//app config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.REACT_HOST,
    optionsSuccessStatus: 200,
  })
);

//app use

app.use("./public", express.static("public"));
//blog
app.use("/public/images/blogs", express.static(path.join(__dirname, "/public/images/blogs")));
//project
app.use("/public/images/projects", express.static(path.join(__dirname, "/public/images/projects")));

//use routes

app.use("/api/auth", authApp);
app.use("/api/user", userApp);
app.use("/api/blog", blogApp);
app.use("/api/project", projectApp);

//connect db
connectDB();

app.listen(process.env.PORT || 3001, () => {
  console.log("Ahmad Software server is running");
});

//multer blog storage

const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/blogs");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const blogUploader = multer({ storage: blogStorage });

app.post("/api/upload/blog", blogUploader.single("blogImage"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//multer project image

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/projects");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const projectUploader = multer({ storage: projectStorage });

app.post("/api/upload/project", projectUploader.single("projectImage"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
