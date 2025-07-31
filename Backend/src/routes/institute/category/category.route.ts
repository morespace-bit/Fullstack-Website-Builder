import { Router } from "express";
import Category from "../../../controller/institute/category/category.controller";

const router: Router = Router();

router
  .route("/category")
  .post(Category.crateCategory)
  .get(Category.getCategories);

router.route("/category/:id").delete(Category.deleteCategory);

export default router;
