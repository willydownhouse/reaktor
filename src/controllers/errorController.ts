import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import AppError from '../utils/appError';

export const errorHandler: ErrorRequestHandler = (
  err: AppError | MulterError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log('FROM ERROR CONTROLLER:');
  console.log(err);

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  if (err.name === 'MulterError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(statusCode).json({
    message: err.message,
  });
};
