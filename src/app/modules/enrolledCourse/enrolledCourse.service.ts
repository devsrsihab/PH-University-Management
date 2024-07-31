/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import { EnrolledCourse } from './enrolledCourse.model';
import mongoose from 'mongoose';
import { Course } from '../course/course.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

// create
const createEnrolledCourseToDB = async (userId: string, payload: TEnrolledCourse) => {
  /**
   * step 1: check the offered course , is it really exist
   * step 2: if exist then check is the student is already enrolled
   * step 3: check the offercourse max capacity
   * step 4: check the course credits exceed of semester credits
   * step 4: if not enrolled then create
   */

  //* step 1
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course does not exist');
  }

  //* step 2
  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist');
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is Already Enrolled');
  }

  //* step 3
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Class Room is full');
  }

  //* step 4
  const course = await Course.findById(isOfferedCourseExists.course);
  const currentCourse = course?.credits;

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');
  const maxCredit = semesterRegistration?.maxCredit;

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  console.log(totalCredits + currentCourse);

  if (totalCredits && maxCredit && totalCredits + currentCourse > maxCredit) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have exceeded your max credit');
  }

  //*start transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //*finally stored
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course Enrollment Failed');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      { maxCapacity: maxCapacity - 1 },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseToDB,
};
