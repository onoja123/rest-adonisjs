import { Request } from "express";
import { Schema } from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      user: {
        uid: string;
        email: string;
        accountType: {
          type: string;
          isDealer: boolean;
        };
        firstname: string;
        lastname: string;
        phoneNumber: string;
        _id: Schema.Types.ObjectId;
        country: string;
      };
    }
  }
}
