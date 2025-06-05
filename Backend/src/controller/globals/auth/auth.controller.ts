//  Project analysis

//importing types for the req-->reaquest and res-->response from express
import { Request, Response } from "express";
import User from "../../../database/models/user.model";

// Register
// to integrate this we need to know incomming data --> username, email, password;
// processing or checking --> email, valid , password, complasary field

// db query --> table ma insert/read/delete/update

class AuthController {
  async registerUser(req: Request, res: Response) {
    // josn data always comes or textul data comes in req.body // textual data
    // files --> req.files
    //accepting data form user form frontend
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({
        message: "Pleaser provide username, password, email",
      });
    } else {
      // insert into usertables
      await User.create({
        username,
        password,
        email,
      });
    }
  }
}

// login

//Forget possword /reset password or otp sending

// logout

// exporting
export const authController = new AuthController();
