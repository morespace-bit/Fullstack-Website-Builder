import bcrypt from "bcrypt";

export function generateRandomPassword(teacherName: string) {
  const no = Math.floor(Math.random() * 90000);

  const pass = `teacherName_${no}`; //

  const bcryptData = bcrypt.hashSync(pass, 10);

  const passData = {
    plain: pass, // to send in the mail to the teacher
    hased: bcryptData, // to store in the database
  };

  return passData;
}
