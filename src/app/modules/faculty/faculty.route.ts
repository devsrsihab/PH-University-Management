import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyController.getFaculties);
router.get('/:facultyId', FacultyController.getSingleFacultie);
// router.patch('/:studentId', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);
// 
export const FacultyRoute = router;
