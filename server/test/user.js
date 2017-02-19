const {login, logout} = require('./login');
var assert = require('assert');

describe('login', () => {
  it ('failed logout', done => {
    logout('', false).then(() => done()).catch(err => err);
  });
  it('login request', async done => {
    let result = await login()
      .then(data => logout(data))
      .catch(err => err);
    done(result);
  });
});
