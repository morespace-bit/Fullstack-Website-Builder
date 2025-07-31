import nodemailer from "nodemailer";
import { dotEnv } from "../config/config";

const sendMail = async (email: string, pass: string) => {
  // the core logic to send mail goes here
  // step 1: create nodemailer transport
  // auth --> this is the sender email and pass
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: dotEnv.gmail,
      pass: dotEnv.password, // not the real password rather a app password
    },
  });

  const mailFormatObject = {
    from: "Builder",
    to: email,
    subject: "Welcome to Builder platform",
    text: `Welcome to our platform my user here is your password ${pass} don't share this with anyone. And do change the password`,
  };

  try {
    await transporter.sendMail(mailFormatObject);
  } catch (e) {
    console.log("Error while sending message");
  }
};

export default sendMail;
