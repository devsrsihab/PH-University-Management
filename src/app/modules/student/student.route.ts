import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/get-students', StudentController.getStudent);
router.get('/get-student/:id', StudentController.getSingleStudent);
router.delete('/delete-student/:id', StudentController.deleteStudent);

export const StudentRoute = router;
