import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import checkExistenceAndThrowError from '../../utils/checkExistenceAndThrowError ';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

// create
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);
  const isDeleted = user?.isDeleted;
  const isUserBlocked = user?.status === 'blocked';

  // user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
  }

  // check deleted
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
  }

  // check block
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
  }

  // checking password
  const isPasswordMatch = await User.isPasswordMatch(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }
};

export const AuthServices = {
  loginUser,
};
