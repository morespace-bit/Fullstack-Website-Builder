import express, { Request, Router } from "express";

import CourseController from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
import { multer, storage } from "../../../middleware/multer.middleware";

const upload = multer({ storage: storage });

const router: Router = Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    upload.single("thumbnail"),
    CourseController.createCourse
  );

export default router;
