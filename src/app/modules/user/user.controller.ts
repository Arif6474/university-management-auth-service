import { RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../Routes/catchAsync';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);
  res.status(200).json({
    status: 'success',
    message: 'user created successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
