import { Sequelize } from "sequelize";
import { dotEnv } from "../config/config";

// here the Sequelize is the class

// in the mysql the default username is root

const sequelize = new Sequelize({
  database: dotEnv.dbName, // the name of the database
  username: dotEnv.dbUserName, // database to username root by default
  password: dotEnv.dbPassword, //the password is empty by default
  host: dotEnv.dbHost, //where is te database hosted now it is locally hosted on the localhost
  dialect: "mysql", // which database is being used
  port: Number(dotEnv.dbPort), // the default port number for the mysql database
});

sequelize
  .authenticate()
  .then(() => {
    console.log("The connection was success full");
  })
  .catch((e) => {
    console.log("There was error connecting", e);
  });

export default sequelize;
