import { Request, Response } from "express";
import { IextendedRequest } from "../../../middleware/types";
import sequelize from "../../../database/connection";

class CourseController {
  static async createCourse(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.instituteNumber;

    if (!req.body) {
      res.status(400).json({ message: "Please enter data" });
      return;
    }
    const {
      coursePrice,
      courseName,
      courseDescription,
      courseDuration,
      courseLevel,
    } = req.body;

    if (!coursePrice || !courseName || !courseDescription || !courseLevel) {
      res.status(400).json({ message: "Please enter all the data" });
      return;
    }

    const courseThumbnail = null;

    const returnedData = await sequelize.query(
      `INSERT INTO course_${instituteNumber}(
    coursePrice,
      courseName,
      courseDescription,
      courseDuration,
      courseLevel
    ) , VALUES(?,?,?,?,?)`,
      {
        replacements: [
          coursePrice,
          courseName,
          courseDescription,
          courseDuration,
          courseLevel,
        ],
      }
    );

    console.log(returnedData);

    res.status(200).json({
      message: "course creted successfully",
    });
  }
}

export default CourseController;
