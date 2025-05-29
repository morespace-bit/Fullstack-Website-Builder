import app from "./src/app";
import { dotEnv } from "./src/config/config";

const serverRun = () => {
  app.listen(dotEnv.port, () => {
    console.log(`The server is running on the port ${dotEnv.port}`);
  });
};

serverRun();
