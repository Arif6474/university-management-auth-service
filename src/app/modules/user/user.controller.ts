import { RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const {student, ...user } = req.body;
  const result = await UserService.createStudent(student, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const {faculty, ...user } = req.body;
  const result = await UserService.createFaculty(faculty, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty
};

