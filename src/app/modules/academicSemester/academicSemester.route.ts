import express from 'express';
// import validateRequest from '../../middleware/validateRequest';
// import { UserController } from './user.controller';

// import { AcademicSemesterController } from './academicSemester.controller';
// import { AcademicSemesterValidation } from './acdemicSemester.validation';
const router = express.Router();

router.post(
  '/create-semester',
//   validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
//   AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;