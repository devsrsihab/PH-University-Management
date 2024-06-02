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
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
