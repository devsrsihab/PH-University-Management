import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

// global errro handling
const notFound = (req: Request, res: Response, next: NextFunction) => {

  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: ''
  });
};

export default notFound;
