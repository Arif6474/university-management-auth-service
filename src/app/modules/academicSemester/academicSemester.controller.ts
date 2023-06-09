import { RequestHandler } from 'express';
import { CreateAcademicSemester } from './academicSemester.service';
import catchAsync from '../../Routes/catchAsync';

const createSemester: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicSemesterData } = req.body;
  const result = await CreateAcademicSemester.createSemester(
    academicSemesterData
  );
  res.status(200).json({
    status: 'success',
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
};
