import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicFacultySchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicDepertment: {
      type: Schema.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// make model
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicFacultySchema,
);
