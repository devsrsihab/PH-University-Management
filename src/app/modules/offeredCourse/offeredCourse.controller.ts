import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

// crate
const createOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await OfferedCourseServices.createOfferedCourseToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' created OfferedCourse successfully',
    data: result,
  });
});

// get all
const getAllOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrive OfferedCourse successfully',
    data: result,
  });
});

// sinlge
const getSingleOfferedCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse Single Data get successfully',
    data: result,
  });
});

// update
const updateOfferedCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateAbleData = req.body;
  const result = await OfferedCourseServices.updateOfferedCourseToDB(id, updateAbleData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Updated Offered Course successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
