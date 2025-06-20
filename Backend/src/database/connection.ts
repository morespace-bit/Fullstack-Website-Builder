import { Sequelize } from "sequelize-typescript";
import { dotEnv } from "../config/config";
// import { dirname } from "path";
import { error } from "console";

// here the Sequelize is the class

// in the mysql the default username is root

const sequelize = new Sequelize({
  database: dotEnv.dbName, // the name of the database
  username: dotEnv.dbUserName, // database to username root by default
  password: dotEnv.dbPassword, //the password is empty by default
  host: dotEnv.dbHost, //where is te database hosted now it is locally hosted on the localhost
  dialect: "mysql", // which database is being used
  port: Number(dotEnv.dbPort), // the default port number for the mysql database
  models: [__dirname + "/models"], // this code goes to the models folder and imports any files or class that is exported which extends the Model class here the User class also extends the Model class
});

sequelize
  .authenticate()
  .then(() => {
    console.log("The connection was success full");
  })
  .catch((e) => {
    console.log("There was error connecting", e);
  });

// the code for the database migration from local to online database
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("The database migration was successfull");
  })
  .catch((e) => {
    console.error("There wass an error in migratoin", error);
  });

export default sequelize;
