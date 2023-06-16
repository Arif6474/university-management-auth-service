import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { logger } from '../../../shared/logger';
import { userType } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createUser = async (user: userType): Promise<userType | null> => {
  const academinSemester ={
    code : '01',
    year: '2024'
  }
  const id = await generateFacultyId();
  user.id = id;

  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await User.create(user);
  logger.info(createdUser);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
