import { Model, Types } from 'mongoose';
import AppError from '../errors/appError';
import httpStatus from 'http-status';

const checkExistenceAndThrowError = async (model: Model<any>, id: Types.ObjectId | string, message: string) => {
  const isExist = await model.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, message);
  }
  return isExist;
};

export default checkExistenceAndThrowError;
