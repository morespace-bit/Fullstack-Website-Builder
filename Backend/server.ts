import app from "./src/app";
import { dotEnv } from "./src/config/config";

// importing the connection code because the main entry point of the project is
//server.ts so that the connection code runs and everthing happnes if were to be not imported the connection code woouldn't work
import "./src/database/connection";

// the function to run the server
const serverRun = () => {
  app.listen(dotEnv.port, () => {
    console.log(`The server is running on the port ${dotEnv.port}`);
  });
};

serverRun();
