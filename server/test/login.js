const crypto = require('crypto');
const request = require('./request');

var loginCookie = null;

async function login() {
  const postData = {
    email: 'admin@admin.com',
    password: crypto.createHash('md5').update('123456').digest('hex')
  };
  if (loginCookie) {
    return loginCookie;
  }
  let {res, body} = await request({
    method: 'POST',
    path: '/login'
  }, postData);
  const result = JSON.parse(body);
  if (result.state) {
    loginCookie = res.headers['set-cookie'];
    return loginCookie
  } else {
    throw new Error(result.message);
  }
}

async function logout(cookie, shouldSuccess = true) {
  let {res} = await request({
    method: 'POST',
    path: '/logout',
    headers: {Cookie: cookie}
  });
  if (res.statusCode === 200) {
    loginCookie = null;
  }
  if (shouldSuccess && res.statusCode !== 200) {
    throw new Error('statusCode !== 200');
  }
  if (!shouldSuccess && res.statusCode !== 401) {
    throw new Error('statusCode !== 401');
  }
}

module.exports.login = login;
module.exports.logout = logout;
