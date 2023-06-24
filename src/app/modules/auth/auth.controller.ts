import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const {...userData} = req.body

  const result = await AuthService.loginUser(userData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Logged in successfully',
    data: result,
  });
});

export const AuthController = {
    loginUser,
 
};
