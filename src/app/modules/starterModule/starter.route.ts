import express from 'express';
import { Validation } from './starter.validation';
import validateRequest from '../../middlewares/validateRequest';
import { Controllers } from './starter.controller';

const router = express.Router();

// create academic semester
router.post(
  '/create-academic-faculty',
  validateRequest(Validation.CreateSchemaValidation),
  Controllers.create,
);
// get all facultys
router.get('/', Controllers.getAll);
// get single academic faculty
router.get('/:Id', Controllers.getSingle);
// update facultys
router.patch('/:Id', validateRequest(Validation.UpdateSchemaValidation), Controllers.update);
export const AcademicFacultyRoute = router;
