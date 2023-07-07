import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  //  const accessToken = jwt.sign({
  //   id: isUserExist?.id,
  //   role: isUserExist?.role
  // },config.jwt.secret as Secret, {
  //   expiresIn: config.jwt.expires_in
  // })
  const { id: userId, role, needsChangePassword } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  // const refreshToken = jwt.sign({
  //   id: isUserExist?.id,
  //   role: isUserExist?.role
  // },config.jwt.refresh_secret as Secret, {
  //   expiresIn: config.jwt.refresh_expires_in
  // })
  //   const user =new User()
  //   const isUserExit = await user.isUserExit(id)
  //   if (!isUserExit) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  //   }

  //  if (isUserExit.password && !user.isPasswordMatched(password , isUserExit?.password)) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  //  }

  return {
    accessToken,
    refreshToken,
    needsChangePassword,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.isUserExist(user?.userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcript_salt_round as string)
  );
  // update password
  const updatedData = {
    password: newHashedPassword,
    needsChangePassword: false,
    passwordChangeAt: new Date(),
  };
  await User.findOneAndUpdate({ id: user?.userId }, updatedData);
};
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
