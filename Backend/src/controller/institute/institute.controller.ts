import { Response, Request } from "express";

import sequelize from "../../database/connection";
import { genereateInstituteNo } from "../../services/generateRandomInstituteNo";

interface IextendedRequest extends Request {
  user?: {
    username: string;
    email: string;
    role: string;
  };
}

class InstituteController {
  static async createInstitute(req: IextendedRequest, res: Response) {
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

    res.status(200).json("Institute Created");
  }
}

export default InstituteController;
