// import { Request } from "express";
// import multer from "multer";

// const storage = multer.diskStorage({
//   // this function dictates where to store the uploaded file

//   // cb is the callback function

//   destination: (req: Request, file: Express.Multer.File, cb: any) => {
//     cb(null, "./src/storage");

//     // takes two arg if error comes what to do

//     // next if files comes then what to do
//   },

//   // this function is concerned with how to name the uploaded file
//   filename: (req: Request, file: Express.Multer.File, cb: any) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// export { multer, storage };
