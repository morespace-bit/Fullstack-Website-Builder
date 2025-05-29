import { config } from "dotenv";

config();

export const dotEnv = {
  portNumber: process.env.PORT,
};
