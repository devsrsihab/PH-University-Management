import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StudentRoute } from '../modules/student/student.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();

// all routes
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
];

// travers the all route
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
