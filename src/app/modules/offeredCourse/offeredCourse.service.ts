import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import checkExistenceAndThrowError from '../../utils/checkExistenceAndThrowError ';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { hasTimeConflict } from './offeredCourse.utiles';

// create
const createOfferedCourseToDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    starTime,
    endTime,
  } = payload;

  const isExistSemesterRegistration = await checkExistenceAndThrowError(
    SemesterRegistration,
    semesterRegistration,
    'Semester Registration not found',
  );
  const academicSemester = isExistSemesterRegistration.academicSemester;
  const isExistAcademicFaculty = await checkExistenceAndThrowError(
    AcademicFaculty,
    academicFaculty,
    'Academic Faculty not found',
  );

  const isExistAcademicDepartment = await checkExistenceAndThrowError(
    AcademicDepartment,
    academicDepartment,
    'Academic Department not found',
  );
  // check if the bepartment is belong to the faculty
  const isDepartmentBelongToTheFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentBelongToTheFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isExistAcademicDepartment.name} Department not belong to the ${isExistAcademicFaculty.name} Faculty`,
    );
  }

  checkExistenceAndThrowError(Course, course, 'Course not found');
  checkExistenceAndThrowError(Faculty, faculty, 'faculty not found');

  // check same section in same
  const isSameOfferedCourseExistsWithSameResiteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      section,
      course,
    });

  if (isSameOfferedCourseExistsWithSameResiteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered Course with same section is already exist ',
    );
  }

  // check faculty shedule
  const assignedShedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days starTime endTime');

  console.log('data', assignedShedules);

  const newShedule = {
    starTime,
    endTime,
    days,
  };

  if (hasTimeConflict(assignedShedules, newShedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Faculty is not availabe at that time Choose other time or date ',
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

// get all
const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

// get single
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

// update
const updateOfferedCourseToDB = async (id: string, payload: TOfferedCourse) => {
  const result = await OfferedCourse.findByIdAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseToDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseToDB,
};
