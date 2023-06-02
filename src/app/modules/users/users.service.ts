import config from '../../../config'
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
  if (!createdUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default {
  createUser,
}