import { Schema as mongooseSchema } from 'mongoose';
import { Roles } from '../enums/roles';

export interface IProjectDetails {
  _id: mongooseSchema.Types.ObjectId;
  title: string;
  overview: string;
  startDate: Date;
  endDate: Date;
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
