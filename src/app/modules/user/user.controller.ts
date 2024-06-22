import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// student create controller
const createStudent = catchAsync(async (req, res) => {
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

// create faculty controller
const createFaculty = catchAsync(async (req, res) => {
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

// create faculty controller
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: studetnData } = req.body;
  const result = await UserServices.createAdminToDB(password, studetnData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

// get me controller
const getMe = catchAsync(async (req, res) => {
  const {userId, role} = req.user;

  const result = await UserServices.getMeFromDB(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get me retived successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
