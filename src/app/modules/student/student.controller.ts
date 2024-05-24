/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';

// student create controller
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studetnData } = req.body;
    const zodParseData = StudentValidationSchema.parse(studetnData);
    const result = await StudentServices.createStudentToDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// get all student conroller
const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      status: true,
      message: 'student get successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// get single student controller
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      status: true,
      message: 'single student get successfully',
      data: result || 'no data found',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

// delte single student controller
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resutl = await StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: resutl,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getStudent,
  getSingleStudent,
  deleteStudent,
};
