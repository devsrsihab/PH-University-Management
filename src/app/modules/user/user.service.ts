import config from "../../config";
import { generateRandomId } from "../../utils/randomId";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// create student
const createStudentToDB = async (password:string,studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);

  // set user role
  userData.role = 'student';

  // set manually generate id
  userData.id = generateRandomId();

  // create a user
  const newUser = await User.create(userData);

  // if created the user successfully then create the student
  if (Object.keys(newUser).length) {
    // set user id in student id field
    studentData.id = newUser.id; // embating id
    // set student user field data
    studentData.user = newUser._id; // reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }

  return newUser;
};


export const UserServices = {
  createStudentToDB,
};