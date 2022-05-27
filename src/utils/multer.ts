import multer from 'multer';

const maxSize = 1024 * 100;

export const upload = multer({
  dest: './uploads',
  limits: {
    fileSize: maxSize,
  },
  // fileFilter: function (_req, file, cb) {
  //   console.log('FROM MULTER FILE FILTER:');
  //   console.log(file);
  //   if (
  //     file.mimetype === 'application/octet-stream' ||
  //     file.mimetype === 'application/toml'
  //   ) {
  //     return cb(null, true);
  //   }
  //   cb(null, false);
  // },
});
