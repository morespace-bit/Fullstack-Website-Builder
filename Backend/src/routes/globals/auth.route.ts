import { Router } from "express";
import { authController } from "../../controller/globals/auth/auth.controller";

const router: Router = Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);

export default router;
