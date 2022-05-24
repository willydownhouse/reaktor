import app from '../src/app';
import supertest from 'supertest';

const api = supertest(app);

describe('FILE UPLOAD ROUTE', () => {
  test('fails if no file in request', async () => {
    const res = await api.post('/api/upload');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please insert a toml file');
  });
  test('fails if file type is not toml', async () => {
    const res = await api
      .post('/api/upload')
      .attach('upload_file', '.eslintrc');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please insert a toml file');
  });
  test('success with toml file', async () => {
    const res = await api
      .post('/api/upload')
      .attach('upload_file', 'test.toml');

    expect(res.statusCode).toBe(200);
    expect(res.body.docs).toBe(4);
    expect(res.body.data[0].package.name).toBe('pytest-sugar');
  });
});
