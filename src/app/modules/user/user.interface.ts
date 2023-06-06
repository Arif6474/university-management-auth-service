import { Model } from 'mongoose'

export type userType = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<userType, Record<string, unknown>>
