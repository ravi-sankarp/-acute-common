import { Schema as mongooseSchema } from 'mongoose';
import { Roles } from '../enums/roles';

export interface projectDetails {
  _id: mongooseSchema.Types.ObjectId;
  title: string;
  overview: string;
  createdBy: string;
  isDeleted: boolean;
  users: [
    {
      email: string;
      role: Roles;
    }
  ];
  createdAt: Date;
  __v: number;
}
