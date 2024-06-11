import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

// Middleware for authentication
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredUserRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify the token
    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // user role checking
      const role = (decoded as JwtPayload).role;
      if (requiredUserRole && !requiredUserRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        
        console.log(requiredUserRole);
      req.user = decoded as JwtPayload;

      next();
    });
  });
};

export default auth;
