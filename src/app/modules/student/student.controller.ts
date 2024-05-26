/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all student conroller
const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student get successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// get single student controller
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single student get successfully',
      data: result || 'no data found',
    });
  } catch (error: any) {
    next(error);
  }
};

// delte single student controller
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const StudentController = {
  getStudent,
  getSingleStudent,
  deleteStudent,
};
