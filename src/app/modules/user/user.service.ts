import mongoose from 'mongoose';
import config from '../../config';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStuentId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

// create student
const createStudentToDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);

  // set user role
  userData.role = 'student';

  // academic semester
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
  // academic department
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);

  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();

    userData.id =
      admissionSemester && academicDepartment ? await generateStuentId(admissionSemester) : '';

    // create a user transaction 01
    const newUser = await User.create([userData], { session }); // transaction return array

    // if created the user successfully then create the student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set user id in student id field
    payload.id = newUser[0].id; // embating id
    console.log(payload.id);
    // set student user field data
    payload.user = newUser[0]._id; // reference id

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentToDB,
};
