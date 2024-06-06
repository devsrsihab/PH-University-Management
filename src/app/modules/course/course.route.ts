import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId', CourseControllers.getSingleCourse);
router.patch(
  '/:courseId',
  validateRequest(CourseValidations.updateCourseValdiationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:courseId', CourseControllers.deleteCourse);

// assign faculty
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.FacultyWithCouseValidaionSchema),
  CourseControllers.assignFacultiesWithCourse,
);
// remove faculty
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.FacultyWithCouseValidaionSchema),
  CourseControllers.removeFacultiesWithCourse,
);

export const CourseRoute = router;
