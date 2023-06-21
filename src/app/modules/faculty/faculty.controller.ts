import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Faculty is retrived successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
  
    const result = await FacultyServices.updateFaculty(id, updateData);
  
    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Faculty is updated successfully',
      data: result,
    });
  });
export const FacultyController = {
  getSingleFaculty,
  updateFaculty
};
