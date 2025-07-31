import { Response, Request, NextFunction } from "express";

import sequelize from "../../database/connection";
import { genereateInstituteNo } from "../../services/generateRandomInstituteNo";

import { IextendedRequest } from "../../middleware/types";
import User from "../../database/models/user.model";
import { request } from "http";
class InstituteController {
  static async createInstitute(
    req: IextendedRequest,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body) {
      res.status(400).json({ message: " please enter all the data" });
      return;
    }

    console.log(req.user, "From middleware ");
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;

    const { instituteVatNo, institutePanNo } = req.body;

    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message: " Plese provide all the data required in the institue",
      });

      return;
    }
    // this is assning a random no to institute table created
    const instituteNum = genereateInstituteNo();

    // NOW ADDING RAW QUEREIS FOR THE INSTITUTE
    // SO  sql quries in small is allright but the conventition is that writting in uppercase
    // why varchar(255) // so this standard like done triditionally and it fits for most of the casese
    // and like you could do smaller than 255 or more than 255 but if do like more than 255 waste of memory and less it may not fit the case
    // and why it was don traditionally was that in the previous databases string was store in in 1byte and 1byte can take string up to only 255 char so
    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNum} (

   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL, 
    instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
    institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE, 
    instituteAddress VARCHAR(255) NOT NULL,
    institutePanNo VARCHAR(255),
    instituteVatNo VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
    )`);
    // Why phno in varchar() as a string one reason phno are not and never numbers (mathematicallY)
    // you can never add substract, multiply phone numbers

    // phone no can be vary long and int only stores data up to only 10 and ph no can be more than of the length 10

    await sequelize.query(
      `INSERT INTO institute_${instituteNum}(
      instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo
  
  ) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          institutePanNo || null,
          instituteVatNo || null,
        ],
      }
    );

    // creating the table called user_institute to track the table created by the user

    /*


foreing key the refrences 


    */

    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId VARCHAR(225) REFERENCES users(id),
  instituteNumber INT UNIQUE
  
  )`);

    if (req.user) {
      // this is the code to store which institue the user is currently using
      await User.update(
        {
          currentInstituteNumber: instituteNum,
          role: "institute",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      // this is the table that is going to be used to store the history of all the institute created by the users

      await sequelize.query(
        `INSERT INTO user_institute(userId, instituteNumber) VALUES(?,?)`,
        {
          replacements: [req.user.id, instituteNum],
        }
      );
    }
    if (req.user) {
      req.user.currentInstituteNumber;
    }

    next();
  }

  static async createTeacherTable(
    req: IextendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    // raw sql query to create a teacherTable with links with the institue number

    try {
      await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  teacherName VARCHAR(255)  NOT NULL UNIQUE,
  teacherPhoneNumber  VARCHAR(255) NOT NULL UNIQUE,
  teacherExpertise VARCHAR(255),
  joinedDate DATE,
  salary VARCHAR(100),
  teacherPhoto VARCHAR(100)
  password VARCHAR(100)
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  
  )`);
      next();
    } catch (e) {
      console.log("Error", e);
      res
        .status(500)
        .json({ message: "internal server error in teacher table creation" });
    }
  }
  static async createStudentTable(
    req: IextendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;

    try {
      await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        studentName VARCHAR(255) NOT NULL,
        sudentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
        studentAddress VARCHAR(255), 
        enrolledDate DATE,
        sutdentImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

      next();
    } catch (e) {
      console.log("Error", e);
      res
        .status(500)
        .json({ message: "internal server error in student table creation" });
    }
  }

  static async createCourseTable(req: IextendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    try {
      await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
  id INT PRIMARY KEY AUTO_INCREMENT,

  courseName VARCHAR(255) NOT NULL UNIQUE,
  coursePrice VARCHAR(255) NOT NULL,
  courseDuration VARCHAR(255) NOT NULL,
  courseLevel ENUM('beginner', 'intermediate', 'advance') NOT NULL,
  courseThumbnail VARCHAR(200), 
  courseDescription TEXT,
  teacherId VARCHAR(36) REFRENCES teacher_${instituteNumber}(id),
  categoryId VARCHAR(36) not NULL REFRENCES category_${instituteNumber}(id),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP


  )`);

      res.status(200).json({ message: "Institute creation was successfull" });
    } catch (e) {
      console.log("Error in course table", e);
    }
  }

  static async createCategoryTable(
    req: IextendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      categoryName VARCHAR(100) NOT NULL,
      categoryDescription TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

      )`
    );
    next();
  }
}

export default InstituteController;
