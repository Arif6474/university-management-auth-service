/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { UserModel, IUser } from './user.interface';
import config from '../../../config';

const UserSchema = new Schema<IUser, UserModel>(
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
      select: 0,
    },
    needsChangePassword: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
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

UserSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsChangePassword'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsChangePassword: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcript_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);

// UserSchema.methods.isUserExit = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsChangePassword: 1 }
//   );
//   return user;
// };

// UserSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savePassword:string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savePassword);
// };
