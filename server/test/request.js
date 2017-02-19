const http = require('http');

const requestOptions = {
  hostname: 'localhost',
  port: '3005',
  headers: {
    'Content-Type': 'application/json',
  }
};

function request(options, postData) {
  return new Promise((resolve, reject) => {
    let req = http.request(Object.assign({}, requestOptions, options), res => {
      let chunkData = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        chunkData += chunk;
      });
      res.on('end', () => {
        resolve({res: res, body: chunkData});
      });
    });
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}
module.exports = request;
