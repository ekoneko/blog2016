/**
 * @file user controller
 */

'use strict';

const crypto = require('crypto');
const parse = require('co-body');
const DB = require('../services/db');
const Session = require('../services/session');

const userModel = DB.getInstance().model('users');

/**
 * Login
 */
module.exports.login = async ctx => {
  const data = await parse(ctx);
  const email = data.email;
  const sessionManager = new Session({
    schema: process.env.SESSION_SCHEMA,
    expireSecond: process.env.SESSION_EXPIRE_SECOND
  });
  ctx.body = await userModel.findOne({email})
    .then(async row => {
      if (!row) {
        return {state: false, message: 'User not exists'}
      }
      const password = crypto.createHash('md5').update(data.password + row.get('salt')).digest('hex');
      if (row.get('password') !== password) {
        return {state: false, message: 'Password not match'}
      }
      const sid = await sessionManager.set({
        id: row.get('id'),
        name: row.get('name'),
        email: row.get('email'),
        role: row.get('role'),
      });
      ctx.cookies.set('SESSIONID', sid, {
        maxAge: +process.env.SESSION_EXPIRE_SECOND * 1000
      });
      return {state: true};
    })
    .catch(err => {
      ctx.status = 500;
      return DB.getErrorMessage(err)
    })
};

/**
 * Logout
 */
module.exports.logout = ctx => {
  ctx.body = 'success'
};

/**
 * Account info
 */
module.exports.info = ctx => {
  ctx.body = ctx.state.user;
};
