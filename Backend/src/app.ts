import express from "express";
import authRoute from "./routes/globals/auth.route";
import instituteRoute from "./routes/institute/institute.route";
import courseRoute from "./routes/institute/course/course.route";
import categoryRoute from "./routes/institute/category/category.route";
import teacherRoute from "./routes/teacher/teacher.route";

const app = express();

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/course", courseRoute);
app.use("/api/", categoryRoute);
app.use("/api", teacherRoute);
export default app;
