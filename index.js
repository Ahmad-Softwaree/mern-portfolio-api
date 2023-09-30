import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database.js";
import adminRouter from "./routes/admin_routes.js";
import blogRouter from "./routes/blog_routes.js";
import projectRouter from "./routes/project_routes.js";
import workRouter from "./routes/work_routes.js";
import stackRouter from "./routes/stack_routes.js";
import categoryRouter from "./routes/category_routes.js";
import skillRouter from "./routes/skill_routes.js";
import typeRouter from "./routes/type_routes.js";
import certificateRouter from "./routes/certificate_routes.js";
import subscribeRouter from "./routes/subscribe_routes.js";
dotenv.config();
const app = express();

//app config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.REACT_HOST],
    optionsSuccessStatus: 200,
  })
);

//use routes

app.use("/api/admin", adminRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/projects", projectRouter);
app.use("/api/certificates", certificateRouter);
app.use("/api/works", workRouter);
app.use("/api/stack", stackRouter);
app.use("/api/category", categoryRouter);
app.use("/api/type", typeRouter);
app.use("/api/skill", skillRouter);
app.use("/api/subscribes", subscribeRouter);

//connect db
connectDB();

app.listen(process.env.PORT || 3001, () => {
  console.log("Ahmad Software server is running");
});
