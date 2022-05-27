import app from './app';
import config from './utils/config';

const PORT = config.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
