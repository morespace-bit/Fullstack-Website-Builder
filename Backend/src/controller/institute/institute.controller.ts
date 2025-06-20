import { Response, Request } from "express";

import sequelize from "../../database/connection";

class InstututeController {
  async ceareteINstutuer(req: Request, res: Response) {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;

    const { instituteVatNo } = req.body || null;
    const { institutePanVatNo } = req.body || null;

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

    // NOW ADDING RAW QUEREIS FOR THE INSTITUTE
    // SO  sql quries in small is allright but the conventition is that writting in uppercase
    // why varchar(255) // so this standard like done triditionally and it fits for most of the casese
    // and like you could do smaller than 255 or more than 255 but if do like more than 255 waste of memory and less it may not fit the case
    // and why it was don traditionally was that in the previous databases string was store in in 1byte and 1byte can take string up to only 255 char so
    sequelize.query(`CREATE TABLE ${instituteName} (

   id INT NOT NULL PRIMIARY KEY AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL, 
    instituteEmail VARCHAR(255) NOT NULL, 
    institutePhoneNumber VARCHAR(255) NOT NULL, 
    instituteAddress VARCHAR(255) NOT NULL,
    institutePanNo VARCHAR(255),
    instituteVatPanNO VARCHAR(255),
    
    )`);
    // Why phno in varchar() as a string one reason phno are not and never numbers (mathematicallY)
    // you can never add substract, multiply phone numbers
    // phone no can be vary long and int only stores data up to only 10 and ph no can be more than of the length 10
  }
}
