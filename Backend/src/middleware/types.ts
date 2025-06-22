import { Request } from "express";

export interface IextendedRequest extends Request {
  user?: {
    id: string;
    currentInstituteNumber?: string;
  };
}

// the thing about typescript types or interface is that they take semicoloons insted of commas
