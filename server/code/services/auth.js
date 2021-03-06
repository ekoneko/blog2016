/**
 * @file auth
 */

'use strict';

const DB = require('../services/db');
const Session = require('../services/session');

/**
 * An auth koa middleware
 * @param authLevel {Array}
 */
function auth(authLevel) {
  return async (ctx, next) => {
    const sid = ctx.cookies.get('SESSIONID');
    const sessionManager = new Session({
      schema: process.env.SESSION_SCHEMA,
      expireSecond: process.env.SESSION_EXPIRE_SECOND
    });
    const user = await sessionManager.get(sid);
    if (!user || !authLevel.includes(user.role.toUpperCase())) {
      ctx.status = 401;
      ctx.body = '';
    } else {
      ctx.state.user = user;
      await next()
    }
  }
}

module.exports = auth;
