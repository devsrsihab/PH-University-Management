import { NextFunction, Request, Response } from 'express';
import UserSchemaValidation from './user.validation';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// student create controller
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studetnData } = req.body;
    // const zodParseData = UserSchemaValidation.parse(studetnData);
    const result = await UserServices.createStudentToDB(password, studetnData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
