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

// pre middlware hook
academicFacultySchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({ name: this.name });

  if (isDepartmentExist) {
    throw new Error('Department Already Exist');
  }

  next();
});

// query middleware
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  console.log(query);
  if (!isDepartmentExist) {
    throw new Error('Department Not Exist');
  }
  next();
});

// make model
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicFacultySchema,
);
