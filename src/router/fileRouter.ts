import express from 'express';

import uploadFileController from '../controllers/fileUploadController';
import { upload } from '../utils/multer';

const router = express.Router();

router
  .route('/')
  .post(upload.single('upload_file'), uploadFileController.uploadTomlFile);

export default router;
