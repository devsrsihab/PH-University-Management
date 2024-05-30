import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

// create academic semester
router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidation.CreateAcademicDepertmentSchemaValidation),
  AcademicDepartmentControllers.createAcademicDepartment,
);
// get all departments
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
// get single academic department
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
// update departments
router.patch(
  '/:departmentId',
  validateRequest(AcademicDepartmentValidation.UpdateAcademicDepertmentSchemaValidation),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
export const AcademicdepartmentRoute = router;
