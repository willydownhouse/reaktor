import { Request, Response, NextFunction } from 'express';
import { parseFileToArrayOfObjects } from '../utils/parseFile';
import AppError from '../utils/appError';

const uploadTomlFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.file);
    if (!req.file) {
      throw new AppError('Please insert a toml file', 400);
    }

    const data = await parseFileToArrayOfObjects(req.file.path);

    res.status(200).json({
      docs: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  uploadTomlFile,
};
