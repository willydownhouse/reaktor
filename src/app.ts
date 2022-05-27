import express, { NextFunction } from 'express';
import cors from 'cors';
import fileUploadRouter from './router/fileRouter';
import { errorHandler } from './controllers/errorController';
import AppError from './utils/appError';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
});

app.use(limiter);
app.use(cors());

app.use('/api/upload', fileUploadRouter);

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.all('*', (_req, _res, next: NextFunction) => {
  next(new AppError('unknown endpoint', 404));
});

app.use(errorHandler);

export default app;
