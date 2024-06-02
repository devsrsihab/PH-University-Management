import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

// global errro handling
const globalErrHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  // default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // hanlde zod error
  const hanldeZodError = (err: ZodError) => {
    // error sources
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });

    // return hanldezodeError
    return {
      statusCode,
      message: 'Validation error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = hanldeZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // error: err,
  });
};

export default globalErrHandler;
