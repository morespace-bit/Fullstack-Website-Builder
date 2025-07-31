import { Router } from "express";
import InstituteController from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";

// like this Router is both a callable function and as well as a types which can be used

const router: Router = Router();

router
  .route("/createInstitute")
  .post(
    Middleware.isLoggedIn,
    InstituteController.createInstitute,
    InstituteController.createTeacherTable,
    InstituteController.createStudentTable,
    InstituteController.createCategoryTable,
    InstituteController.createCourseTable
  );

export default router;
