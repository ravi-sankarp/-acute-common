import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';

export type ProjectDocument = HydratedDocument<Projects>;

// schema for nested users array
@Schema({ _id: false, versionKey: false })
class UserSchema {
  @Prop({ required: true, type: mongooseSchema.Types.String })
  email: string;

  @Prop({
    type: mongooseSchema.Types.String,
    enum: ['Team Lead', 'Admin', 'Employee'],
    required: true
  })
  role: 'Team Lead' | 'Admin' | 'Employee';
}

const UserArraySchema = SchemaFactory.createForClass(UserSchema);

// project schema
@Schema({ timestamps: true })
export class Projects {
  @Prop({ required: true, type: mongooseSchema.Types.String })
  title: string;

  @Prop({ required: true, type: mongooseSchema.Types.Date })
  startDate: string;

  @Prop({ required: true, type: mongooseSchema.Types.Date })
  endDate: string;

  @Prop({ required: true, type: mongooseSchema.Types.String })
  overview: string;

  @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'Users' })
  createdBy: string;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: true, type: [UserArraySchema] })
  users: [UserSchema];
}
const ProjectSchema = SchemaFactory.createForClass(Projects);

ProjectSchema.virtual('userlist', {
  ref: 'Users',
  localField: 'users.email',
  foreignField: 'email'
});

export { ProjectSchema };
