import { Schema, model } from 'mongoose';
import { UserModel, userType } from './user.interface';

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
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty'
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<userType, UserModel>('User', userSchema);
