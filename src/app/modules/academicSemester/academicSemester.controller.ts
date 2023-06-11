import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFeilds } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterServices.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFeilds)
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterServices.getAllSemesters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrived successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);
const getSingleSemester = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
  const {id} =req.params;
  const result = await AcademicSemesterServices.getSingleSemester(id)
  
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrived successfully',
    data: result,
  });
  next();
})
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester
};
