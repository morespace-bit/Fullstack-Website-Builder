import express from "express";
import authRoute from "./routes/globals/auth.route";
import instituteRoute from "./routes/institute/institute.route";
import courseRoute from "./routes/institute/course/course.route";

const app = express();

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/course");

export default app;
