import { Router } from "express";
import InstututeController from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";

// like this Router is both a callable function and as well as a types which can be used

const router: Router = Router();

router
  .route("/createInstitute")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(InstututeController.createInstitute)
  );

export default router;
