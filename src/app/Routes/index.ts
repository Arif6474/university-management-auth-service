import express from 'express';
import { UserRouters } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const router = express.Router();
const moduleRoutes =[
    {
        path: '/users/',
        route:UserRouters
    },
    {
        path: '/academic-semesters/',
        route:AcademicSemesterRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path , route.route))

// router.use('users/', UserRouters);
// router.use('academic-semesters/', AcademicSemesterRoutes);

export default router;