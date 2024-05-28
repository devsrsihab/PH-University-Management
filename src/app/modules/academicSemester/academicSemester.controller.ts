import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemeterServices } from './academicSemester.service';

// crate acamdemic semester controller
const crateAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemeterServices.createAcademicSemesterToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = { crateAcademicSemester };
