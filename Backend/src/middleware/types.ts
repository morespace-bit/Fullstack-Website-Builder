import { Request } from "express";

export interface IextendedRequest extends Request {
  user?: {
    id: string;
    username: string | null;
    email: string;
    role: string;
  };
}
