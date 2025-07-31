import e, { Response } from "express";
import { IextendedRequest } from "../../../middleware/types";
import sequelize from "../../../database/connection";

class Category {
  static async crateCategory(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const { categoryName, categoryDescription } = req.body;

    if (!categoryDescription || !categoryDescription) {
      res.status(400).json({
        message: "Please provide all the data",
      });

      return;
    }

    await sequelize.query(
      `INSERT INTO category_${instituteNumber}(
    categoryName, categoryDescription) values(?,?)`,
      {
        replacements: [categoryName, categoryDescription],
      }
    );

    res.status(200).json({
      message: "Category added successfully",
    });
  }

  static async getCategories(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;

    const categoreis = await sequelize.query(
      `SELECT * FROM category_${instituteNumber}`
    );

    res
      .status(200)
      .json({ message: "Categoreis fetched successfully", data: categoreis });
  }

  static async deleteCategory(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;

    await sequelize.query(
      `DELETE FORM category_${instituteNumber} WHERE id = ?`,
      { replacements: [id] }
    );

    res.status(200).json({
      message: "Category delted successfully",
    });
  }
}

export default Category;
