import express, { Request, Router } from "express";

import CourseController from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
// import { multer } from "../../../middleware/multer.middleware";
// import { storage } from "../../../config/cloudinary";

// const upload = multer({ storage: storage });

const router: Router = Router();

router.route("/").post(
  Middleware.isLoggedIn,
  // upload.single("courseThumbnail"),
  CourseController.createCourse
);

export default router;
