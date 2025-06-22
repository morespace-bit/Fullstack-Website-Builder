import { NextFunction, Request, Response } from "express";

const asyncErrorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((e: Error) => {
      console.log(e, "Error");

      res.status(500).json({
        message: "Internal server error",
      });
    });
  };
};

export default asyncErrorHandler;
