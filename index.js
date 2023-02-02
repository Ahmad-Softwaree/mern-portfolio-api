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
import workApp from "./api/work_api.js";

import auth from "./middleware/auth.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
dotenv.config();
const app = express();

//firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPteMbdJkNaAEod8Y6WsXZKbyNFt-Nz9g",
  authDomain: "portfolio-75703.firebaseapp.com",
  projectId: "portfolio-75703",
  storageBucket: "portfolio-75703.appspot.com",
  messagingSenderId: "794760084006",
  appId: "1:794760084006:web:5ef48f1bd3d2d6cb9304e7",
  measurementId: "G-CVCWCN0GSE",
};

// Initialize Firebase
initializeApp(firebaseConfig);

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

//works
app.use("/public/images/works", express.static(path.join(__dirname, "/public/images/works")));

//use routes

app.use("/api/auth", authApp);
app.use("/api/user", userApp);
app.use("/api/blog", blogApp);
app.use("/api/project", projectApp);
app.use("/api/work", workApp);

//connect db
connectDB();

app.listen(process.env.PORT || 3001, () => {
  console.log("Ahmad Software server is running");
});

const uploader = multer({ storage: multer.memoryStorage() });

const storage = getStorage();

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

app.post("/api/upload/blog", auth, uploader.single("blogImage"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "file was not found" });

  const file = req.file;
  let uploadedFilename = file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname);

  const storageRef = ref(storage, `blog-images/${uploadedFilename}`);

  const uploadTask = uploadBytesResumable(storageRef, file.buffer);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      res.status(400).json({ warning: error });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        res.status(200).json({ message: "uploaded", url: downloadURL });
      });
    }
  );
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

app.post("/api/upload/project", auth, uploader.single("projectImage"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "file was not found" });

  const file = req.file;
  let uploadedFilename = file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname);

  const storageRef = ref(storage, `project-images/${uploadedFilename}`);

  const uploadTask = uploadBytesResumable(storageRef, file.buffer);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      res.status(400).json({ warning: "هەڵەیەک هەیە" });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        res.status(200).json({ message: "uploaded", url: downloadURL });
      });
    }
  );
});

//multer work image

const workStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/works");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const workUploader = multer({ storage: workStorage });

app.post("/api/upload/work", auth, uploader.single("workImage"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "file was not found" });

  const file = req.file;
  let uploadedFilename = file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname);

  const storageRef = ref(storage, `work-images/${uploadedFilename}`);

  const uploadTask = uploadBytesResumable(storageRef, file.buffer);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      res.status(400).json({ warning: "هەڵەیەک هەیە" });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        res.status(200).json({ message: "uploaded", url: downloadURL });
      });
    }
  );
});
