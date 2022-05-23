import express from 'express';
import multer from 'multer';
import { parseFileToArrayOfObjects } from './utils/parseFile';
const upload = multer({ dest: './uploads' });

const app = express();

app.use(express.json());

app.post('/api/upload', upload.single('upload_file'), async (req, res) => {
  try {
    if (!req.file || req.file.mimetype !== 'application/toml') {
      return res.status(400).json({
        message: 'Please insert a toml file',
      });
    }
    console.log(req.file);
    console.log('________________');

    const data = await parseFileToArrayOfObjects(req.file.path);

    return res.status(200).json(data);
  } catch (err) {
    return console.log(err);
  }
});

app.all('*', (_, res) => {
  res.send('unknown endpoint');
});

export default app;
