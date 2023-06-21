import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidaion } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get(
  '/:id',
  // validateRequest(UserValidation.createUserZodSchema),
  StudentController.getSingleStudent
);
router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete(
  '/:id',
  // validateRequest(UserValidation.createUserZodSchema),
  StudentController.deleteStudent
);

export const StudentRoutes = router;
