import { Model, Schema, model } from 'mongoose'
import { userType } from './users.interface'

type UserModel = Model<userType, object>

const userSchema = new Schema<userType>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<userType, UserModel>('User', userSchema)
