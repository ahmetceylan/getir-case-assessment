const RecordController = require('../api/controllers/RecordController');

describe('record controller test cases', () => {

  it('record controller exception test', async () => {
    let res;
    try {
      res = await RecordController.getRecords({body:{}},{status: jest.fn(), send: jest.fn()});
    } catch (error) {
      expect(res.status).toBe(500);
      expect(res.body.code).toBe(-1);
    }
  });

});
