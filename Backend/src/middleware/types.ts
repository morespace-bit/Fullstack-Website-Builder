import { Request } from "express";

export interface IextendedRequest extends Request {
  user?: {
    id: string;
    username: string | null;
    email: string;
    role: string;
  };

  instituteNumber?: number;
}

// the thing about typescript types or interface is that they take semicoloons insted of commas
