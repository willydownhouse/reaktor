import multer from 'multer';

const maxSize = 1024 * 100;

export const upload = multer({
  dest: './uploads',
  limits: {
    fileSize: maxSize,
  },
  fileFilter: function (_req, file, cb) {
    if (file.mimetype !== 'application/toml') {
      return cb(null, false);
    }
    cb(null, true);
  },
});
