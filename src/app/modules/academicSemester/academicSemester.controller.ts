import { RequestHandler } from 'express';
import { CreateAcademicSemester } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester: RequestHandler = catchAsync(async (req, res , next) => {
  const { ...academicSemesterData } = req.body;
  const result = await CreateAcademicSemester.createSemester(
    academicSemesterData
  );
  next()
  // res.status(200).json({
  //   status: 'success',
  //   message: 'Academic semester is created successfully',
  //   data: result,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result
  })

});

export const AcademicSemesterController = {
  createSemester,
};
