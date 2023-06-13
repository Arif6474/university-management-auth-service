import express from 'express';
import { UserRouters } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/users/',
    route: UserRouters,
  },
  {
    path: '/academic-semesters/',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty/',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('users/', UserRouters);
// router.use('academic-semesters/', AcademicSemesterRoutes);

export default router;
