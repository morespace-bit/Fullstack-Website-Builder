import { Router } from "express";
import Middleware from "../../middleware/middleware";
import Teacher from "../../controller/institute/teacher/teacher.controller";

const router: Router = Router();

router
  .route("/teacher")
  .post(Teacher.createTeacher)
  .get(Teacher.getTeachers)
  .delete(Teacher.deleteTeacher);

export default router;
