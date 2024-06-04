import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// student create controller
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studetnData } = req.body;
  // const zodParseData = UserSchemaValidation.parse(studetnData);
  const result = await UserServices.createStudentToDB(password, studetnData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

// student create controller
const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: studetnData } = req.body;
  // const zodParseData = UserSchemaValidation.parse(studetnData);
  const result = await UserServices.createFacultyToDB(password, studetnData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
};
