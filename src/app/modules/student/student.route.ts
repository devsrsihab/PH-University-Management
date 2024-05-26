import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/get-students', StudentController.getStudent);
router.get('/get-student/:id', StudentController.getSingleStudent);
router.delete('/delete-student/:id', StudentController.deleteStudent);

export const StudentRoute = router;
