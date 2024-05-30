import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStuentId } from './user.utils';

// create student
const createStudentToDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);

  // set user role
  userData.role = 'student';

  // set manually generate id

  // academic semester
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

  userData.id = admissionSemester ? await generateStuentId(admissionSemester) : '';
  console.log(userData);

  // create a user
  const newUser = await User.create(userData);

  // if created the user successfully then create the student
  if (Object.keys(newUser).length) {
    // set user id in student id field
    payload.id = newUser.id; // embating id
    // set student user field data
    payload.user = newUser._id; // reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }

  return newUser;
};

export const UserServices = {
  createStudentToDB,
};
