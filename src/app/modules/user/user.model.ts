/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { UserModel, IUser } from './user.interface';
import config from '../../../config';

const UserSchema = new Schema<IUser>(
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
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcript_salt_round));
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
