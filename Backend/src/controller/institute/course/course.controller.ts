import { Request, Response } from "express";
import { IextendedRequest } from "../../../middleware/types";
import sequelize from "../../../database/connection";

class CourseController {
  static async createCourse(req: IextendedRequest, res: Response) {
    console.log(req.user?.currentInstituteNumber);
    const instituteNumber = req.user?.currentInstituteNumber;

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
      courseThumbnail,
    } = req.body;

    if (
      !coursePrice ||
      !courseName ||
      !courseDescription ||
      !courseLevel ||
      !courseDuration
    ) {
      res.status(400).json({ message: "Please enter all the data" });
      return;
    }

    // const courseThumbnail = req.file ? req.file.path : null;
    console.log(req.body);
    console.log(req.file);

    try {
      const returnedData = await sequelize.query(
        `INSERT INTO course_${instituteNumber}(
    coursePrice,
      courseName,
      courseDescription,
      courseDuration,
      courseLevel,
      courseThumbnail
    ) VALUES(?,?,?,?,?,?)`,
        {
          replacements: [
            coursePrice,
            courseName,
            courseDescription,
            courseDuration,
            courseLevel,
            courseThumbnail,
          ],
        }
      );

      console.log(returnedData);
    } catch (e) {
      console.log("Error form course inserting values", e);
      res.status(400).json({ message: "erorr in data insertion" });
      return;
    }

    res.status(200).json({
      message: "course creted successfully",
    });
  }

  static async getAllCourse(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const data = await sequelize.query(`SHOW TABLES LIKE 'course_%' `);
    const course = await sequelize.query(
      `SELECT * FORM course_${instituteNumber})`
    );
    res.status(200).json({ message: "course fetched", data: course });
  }

  static async getSingleCourse(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;

    const course = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      { replacements: [courseId] }
    );

    res.status(200).json({
      message: "single course fetched",
      data: course,
    });
  }
}

export default CourseController;

// we can also data seed meaning putting some data already like pre data loading
