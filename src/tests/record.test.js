const request = require('supertest');
require('dotenv').config()
const application = require('../app');

describe('getRoutes test cases', () => {
  let requestData;

  afterEach(async () => {
    await application.close();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    requestData = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: '2700',
      maxCount: '3000',
    };
  });

  
  const getRequests = () => request(application).post('/api/getRecords').send(requestData);

  it('startDate input required test', async () => {
    delete requestData.startDate;
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(2);
  });

  it('maxCount input required test', async () => {
    delete requestData.maxCount;
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(2);
  });

  it('minCount input required test', async () => {
    delete requestData.minCount;
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(2);
  });

  it('endDate input required test', async () => {
    delete requestData.endDate;
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(2);
  });

  it('successful record list retrieval', async () => {
    const res = await getRequests();
    expect(res.status).toBe(200);
    expect(res.body.code).toBe(0);
    expect(Array.isArray(res.body.records)).toBe(true);
    expect(Object.keys(res.body.records[0]).sort()).toEqual(['key', 'createdAt', 'totalCount'].sort());
  });

  it('Empty response test', async () => {
    requestData.maxCount= '2000';
    const res = await getRequests();
    expect(res.status).toBe(404);
    expect(res.body.code).toBe(1);
  });

  it('invalid endDate parameter test', async () => {
    requestData.endDate = '2016-21-12';
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(3);
  });

  it('invalid startDate parameter test', async () => {
    requestData.startDate = '1222';
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(3);
  });

  it('invalid endDate parameter test', async () => {
    requestData.endDate = '1222';
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(3);
  });

  it('invalid minCount parameter test', async () => {
    requestData.minCount = 'asd';
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(3);
  });

  it('invalid maxCount parameter test', async () => {
    requestData.maxCount = 'asd';
    const res = await getRequests();
    expect(res.status).toBe(400);
    expect(res.body.code).toBe(3);
  });

});
