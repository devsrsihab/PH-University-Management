import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// last student
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })

    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// userData.id = generateRandomId();
export const generateStuentId = async (payload: TAcademicSemester) => {
  // first time 0
  let currentid = (0).toString();

  // last student id
  const lastStudentId = await findLastStudentId(); // 2030 01 0001
  // last semester id
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code; // coming from client
  const currentYear = payload.year; // coming from client

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentid = lastStudentId.substring(6); // first time will be 0001
  }

  let incrementId = (Number(currentid) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId; // 2032030001
};


// last lastFaculty
const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })

    .lean();

  return lastFaculty?.id ? lastFaculty.id : undefined;
};

// userData.id = generateRandomId();
export const generatFacultyId = async () => {
  // first time 0
  let currentid = (0).toString();
  // last student id
  const lastStudentId = await findLastFacultyId(); // 2030 01 0001


  if (
    lastStudentId
  ) {
    currentid = lastStudentId // if exist last faculty the  the is assign to currentid
  }

  let incrementId = (Number(currentid.substring(2)) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;
  console.log(incrementId)
  return incrementId; // F-0001++
};
