import express from 'express';
import { UserController } from './user.controller';
import { StudentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

// faculty create
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

// admin create
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoute = router;
