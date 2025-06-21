import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";
import sequelize from "../database/connection";

// in middleware we take another arg that is also provided in the
// other function but in the middleware we have to take next as well

interface IextendedRequest extends Request {
  user?: {
    id: string;
    username: string | null;
    email: string;
    role: string;
  };
}

class Middleware {
  static isLoggedIn(req: IextendedRequest, res: Response, next: NextFunction) {
    // steps
    // check if tooken
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        message: "please provide token",
      });

      return;
    }

    // verify the tooken
    // there can be error or there can be result
    jwt.verify(token, "thisissecret", async (error, result: any) => {
      if (error) {
        res.status(403).json({
          message: "Token invalid",
        });
      } else {
        const userData = await User.findByPk(result.id);
        if (!userData) {
          res.status(403).json({ message: "user not found invalid token" });
          return;
        }
        req.user = userData;

        next();
      }
    });

    // this next function is to say or forward the call to the other function
    // that is defined in the route as the second function
    // at the end of every middlaware function you have to call the
    // next to go to the next function to flow the function if it is needed
    // at last
  }
}

export default Middleware;
