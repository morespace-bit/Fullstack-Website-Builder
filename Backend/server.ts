import app from "./src/app";
import { dotEnv } from "./src/config/config";

const serverRun = () => {
  app.listen(dotEnv.portNumber, () => {
    console.log(`The server is running on the port ${dotEnv.portNumber}`);
  });
};
