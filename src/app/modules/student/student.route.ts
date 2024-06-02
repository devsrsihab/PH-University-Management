import express, { Request, Response, NextFunction } from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
// make middlware
const shenabahini = (req: Request, res: Response, next: NextFunction): void => {
  next();
};

router.get('/', StudentController.getStudent);
router.get('/get-student/:id', StudentController.getSingleStudent);
router.patch('/:studentId', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoute = router;
