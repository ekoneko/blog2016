/**
 * @file router
 */

const Router = require('koa-router');
const router = new Router();
const auth = require(`./services/auth`);
const authLevel = require(`./constants/authLevel`);

const userAuth = [authLevel.SUPER, authLevel.WRITER, authLevel.USER];
const writeAuth = [authLevel.SUPER, authLevel.WRITER];
const superAuth = [authLevel.SUPER];

module.exports = function () {
  const post = require('./controllers/post');
  router.get('/post', post.list);
  router.post('/post', auth(userAuth), post.create);
  router.get('/post/:id', post.get);
  router.patch('/post/:id', auth(writeAuth), post.update);
  router.del('/post/:id', auth(writeAuth), post.remove);

  const user = require('./controllers/user');
  router.post('/login', user.login);
  router.post('/logout', auth(userAuth), user.logout);
  router.get('/account', auth(userAuth), user.info);

  return router.routes()
};

module.exports.allowedMethods = function() {
  return router.allowedMethods();
};
