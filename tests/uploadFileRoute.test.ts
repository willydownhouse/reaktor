import app from '../src/app';
import supertest from 'supertest';

const api = supertest(app);

describe('FILE UPLOAD ROUTE', () => {
  test('fails if no file in request', async () => {
    const res = await api.post('/api/upload');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please insert a toml file');
  });
  // test('fails if invalid file type', async () => {
  //   const res = await api
  //     .post('/api/upload')
  //     .attach('upload_file', 'jest.config.ts');

  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.message).toBe('Please insert a toml file');
  // });
  test('success with poetry.lock', async () => {
    const res = await api
      .post('/api/upload')
      .attach('upload_file', 'poetry.lock');

    expect(res.statusCode).toBe(200);
    expect(res.body.docs).toBe(70);
  });
});
