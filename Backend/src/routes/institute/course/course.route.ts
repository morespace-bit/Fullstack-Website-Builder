import express, { Request, Router } from "express";

import multer from "multer";

import CourseController from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";

const router: Router = Router();

router.route("/").post(Middleware.isLoggedIn, CourseController.createCourse);

export default router;
