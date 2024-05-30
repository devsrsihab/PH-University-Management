import express from 'express';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

// create academic semester
router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.CreateAcademicFacultySchemaValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);
// get all facultys
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);
// get single academic faculty
router.get('/academic-faculty/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
// update facultys
router.patch(
  '/academic-faculty/:id',
  validateRequest(AcademicFacultyValidation.UpdateAcademicFacultySchemaValidation),
  AcademicFacultyControllers.updateAcademicFaculty,
);
export const AcademicFacultyRoute = router;
