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
import QueryBuilder from '../../builder/QueryBuilder';

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
  const existingCourseInSameSemesterAndSection = await OfferedCourse.findOne({
    semesterRegistration,
    section,
    course,
  });

  if (existingCourseInSameSemesterAndSection) {
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
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate('semesterRegistration')
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty')
      .populate('course')
      .populate('faculty'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

// get single
const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id)
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('course')
    .populate('faculty');
  return result;
};

// update
const updateOfferedCourseToDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'starTime' | 'endTime'>,
) => {
  const { faculty, days, starTime, endTime } = payload;
  const isExistOfferedCourse = await checkExistenceAndThrowError(
    OfferedCourse,
    id,
    'Offered Course not found',
  );

  await checkExistenceAndThrowError(Faculty, faculty, 'Faculty not found');
  console.log(payload);

  const semesterRegistration = isExistOfferedCourse.semesterRegistration;

  // check semester registraton status UPCOMING
  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${semesterRegistrationStatus?.status} Semester Registration not available for update`,
    );
  }

  // check faculty shedule
  const assignedShedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days starTime endTime');
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
  const result = await OfferedCourse.findByIdAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseToDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseToDB,
};
