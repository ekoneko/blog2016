const {login} = require('./login');
const request = require('./request');

describe('post', () => {
  it ('list', async done => {
    const cookie = await login();
    const {res, body} = await request({
      method: 'GET',
      path: '/post',
      headers: {Cookie: cookie}
    });
    if (res.statusCode !== 200) {
      done(new Error('status not 200'));
    } else {
      done();
    }
  });
});
