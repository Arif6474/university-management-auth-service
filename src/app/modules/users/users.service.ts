import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { logger } from '../../../shared/logger'
import { userType } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: userType): Promise<userType | null> => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  logger.info(createdUser);
  
  if (!createdUser) {
    throw new ApiError(400,'Failed to create user' ,'')
  }
  return createdUser
}

export default {
  createUser,
}
