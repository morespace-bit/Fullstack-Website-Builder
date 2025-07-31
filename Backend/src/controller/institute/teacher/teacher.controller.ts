import { Response } from "express";
import { IextendedRequest } from "../../../middleware/types";
import sequelize from "../../../database/connection";
import { generateRandomPassword } from "../../../services/generatePassword";

class Teacher {
  static async createTeacher(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    let {
      teacherName,
      teacherEmail,
      teacherPh,
      teacherExpertise,
      teacherSalary,
      teacherJoinedDate,
      teacherUrl,
      courseId,
    } = req.body;

    if (!teacherUrl) {
      teacherUrl =
        "https://cdn.vectorstock.com/i/1000v/29/52/faceless-male-avatar-in-hoodie-vector-56412952.avif";
    }

    const passData = generateRandomPassword(teacherName);

    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPh ||
      !teacherExpertise ||
      !teacherSalary ||
      !teacherJoinedDate
    ) {
      res.status(400).json({ message: "Enter all the required data" });
      return;
    }

    await sequelize.query(
      `INSERT INTO teacher_${instituteNumber}(teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, salary, teacherPhone, password) VALUES(?,?,?,?,?,?,?, ?)`,
      {
        replacements: [
          teacherName,
          teacherEmail,
          teacherPh,
          teacherExpertise,
          teacherJoinedDate,
          teacherSalary,
          teacherUrl,
          passData.hased,
        ],
      }
    );

    const teacherData = await sequelize.query(
      `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,
      {
        replacements: [teacherEmail],
      }
    );

    await sequelize.query(
      `UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,
      {
        replacements: [teacherData[0], courseId],
      }
    );

    res.status(201).json({ message: "Teacher created" });
  }

  static async getTeachers(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;

    const teachers = await sequelize.query(
      `SELECT * FROM teacher_${instituteNumber}`
    );
    res.status(200).json({ message: "Teachers data fetched ", data: teachers });
  }

  static async deleteTeacher(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;

    const id = req.params;

    await sequelize.query(`DELETE FORM teacher_${instituteNumber} WHERE id=?`, {
      replacements: [id],
    });
  }
}

export default Teacher;
