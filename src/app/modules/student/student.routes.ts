import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidaion } from './student.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  StudentController.getAllStudents
);
router.get(
  '/:id',
  // validateRequest(UserValidation.createUserZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  StudentController.getSingleStudent
);
router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.updateStudent
);
router.delete(
  '/:id',
  // validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteStudent
);

export const StudentRoutes = router;
