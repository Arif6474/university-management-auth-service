import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';
// import validateRequest from '../../middleware/validateRequest';
// import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  // validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  // validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  // validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRouters = router;
