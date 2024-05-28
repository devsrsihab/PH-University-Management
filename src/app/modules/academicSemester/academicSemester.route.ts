import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

// create academic semester
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
// get all semesters
router.get('/academic-semesters', AcademicSemesterControllers.getAcademicSemester);
// get single academic semester
router.get('/academic-semesters/:semesterId', AcademicSemesterControllers.getSingleAcademicSemeste);
// update semesters
router.patch(
  '/academic-semesters/:id',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);
export const AcademicSemesterRoute = router;
