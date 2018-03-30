const User = require('../../src/schemas/user');

describe('User', () => {
  it('should be invalid if telegramId is empty', (done) => {
    const m = new User();
    m.validate((err) => {
      expect(err.errors.telegramId).toBeDefined();
      done();
    });
  });
});
