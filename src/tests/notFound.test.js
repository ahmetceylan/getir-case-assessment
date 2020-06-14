const request = require('supertest');
const application = require('../app');

describe('middlewares/notFound', () => {
  let requestData;

  afterEach(async () => {
    await application.close();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    requestData = {
    };
  });

  
  const getRequests = () => request(application).post('/api/invalid').send(requestData);

  it('url not found test', async () => {
    const res = await getRequests();
    expect(res.status).toBe(404);
    expect(res.body.code).toBe(5);
  });
});