import { Schema as mongooseSchema } from "mongoose";

export interface userDetails {
  _id: mongooseSchema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  __v: number;
  isDeleted: boolean;
}
