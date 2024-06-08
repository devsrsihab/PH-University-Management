import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

// create
router.post('/create',
  validateRequest(OfferedCourseValidation.CreateOfferedCourseSchemaValidation),
  OfferedCourseControllers.createOfferedCourse,
);
// get all
router.get('/', OfferedCourseControllers.getAllOfferedCourse);
// get single
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
// update
router.patch('/:id',
  validateRequest(OfferedCourseValidation.UpdateOfferedCourseSchemaValidation),
  OfferedCourseControllers.updateOfferedCourse,
);
export const OfferedCourseRoute = router;
