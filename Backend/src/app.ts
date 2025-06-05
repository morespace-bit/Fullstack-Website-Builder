import express from "express";
import authRoute from "./routes/globals/auth.route";

const app = express();

app.unsubscribe("/api/", authRoute);

export default app;
