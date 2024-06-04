import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

// get all getFaculty conroller
const getFaculties = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await FacultyServices.getAllFacultiesFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculties get successfully',
    data: result,
  });
});

// get single faculty controller
const getSingleFacultie = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.getSingleFacultieFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single faculty get successfully',
    data: result || 'no data found',
  });
});

export const FacultyController = {
  getFaculties,
  getSingleFacultie,
};
