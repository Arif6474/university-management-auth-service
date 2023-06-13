import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.services';
import { Request, Response } from 'express';
import { IAcademicFaculty } from './academiFaculty.interface';
import pick from '../../../shared/pick';


const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyServices.createFaculty(
    academicFacultyData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  // const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyServices
    .getAllFaculties
    //   filters,
    //   paginationOptions
    (
        filters  
    );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrived successfully',
    //   meta: result.meta,
    //   data: result.data,
    data: result,
  });
});
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties
};
