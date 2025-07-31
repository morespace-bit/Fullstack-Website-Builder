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
}

export default CourseController;
