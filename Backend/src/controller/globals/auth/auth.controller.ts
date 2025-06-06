//  Project analysis

//importing types for the req-->reaquest and res-->response from express
import { Request, Response } from "express";
import User from "../../../database/models/user.model";
// importing bcrypt for hashing purpose
import bcrypt from "bcrypt";

// Register
// to integrate this we need to know incomming data --> username, email, password;
// processing or checking --> email, valid , password, complasary field

// db query --> table ma insert/read/delete/update

class AuthController {
  async registerUser(req: Request, res: Response) {
    // josn data always comes or textul data comes in req.body // textual data
    // files --> req.files
    //accepting data form user form frontend
    if (req.body === undefined) {
      res.json({ Message: "Please send valid data" });
      return;
    }
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({
        message: "Pleaser provide username, password, email",
      });
    } else {
      // insert into usertables
      try {
        await User.create({
          username,

          // takes two parameter one what to convert another salt value to make it how strong is it

          password: bcrypt.hashSync(password, 12),
        });
      } catch (e) {
        console.error(e);
      }
      res.json({ message: "The user data creation was successfull" });
    }
  }

  // login

  async loginUser(req: Request, res: Response) {
    if (req.body === undefined) {
      res.json({ message: "Enter valid data" });
      return;
    }

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({ message: "Please enter all valid data" });
      return;
    }

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        res.status(401).json({ Message: "user not found" });
        return;
      }

      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        res.status(401).json({ Message: "Password did not match" });
        return;
      }

      res.status(200).json({ Message: "login successfull" });
    } catch (e) {
      console.error(e);
    }
  }
}

//Forget possword /reset password or otp sending

// logout

// exporting
export const authController = new AuthController();
