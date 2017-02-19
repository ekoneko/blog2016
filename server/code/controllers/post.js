/**
 * @file post controller
 */

'use strict';

const parse = require('co-body');
const DB = require('../services/db');
const postModel = DB.getInstance().model('posts');
const queryParse = require('query-string').parse;

const ModifiableFields = ['title', 'summary', 'content'];
const CommonOutputFields = ['id', 'title', 'summary', 'createdAt', 'updatedAt'];

module.exports.list = async ctx => {
  let {offset, size = 10 } = queryParse(ctx.request.querystring);
  offset = +offset || 0;
  let limit = Math.max(1, Math.min(+size, 100));
  ctx.body = await postModel.findAndCountAll({
    offset,
    limit,
    attributes: CommonOutputFields,
    order: 'createdAt desc'
  }).then(response => {
    ctx.set('X-Total', response.count);
    ctx.set('X-Offset', offset);
    ctx.set('X-Limit', limit);
    return response.rows
  }).catch(err => {
    ctx.status = 500;
    return DB.getErrorMessage(err)
  })
};

module.exports.get = async ctx => {
  const id = ctx.params.id;
  ctx.body = await postModel.findOne({
    where: {id}
  }).then(row => {
    if (!row) {
      ctx.status = 404;
      return ''
    }
    return row;
  }).catch(err => {
    ctx.status = 500;
    return DB.getErrorMessage(err)
  })
};

module.exports.create = async ctx => {
  const data = await parse(ctx);
  if (!data.title) {
    ctx.status = 500;
    ctx.body = 'Title cannot be undefined';
    return;
  }
  ctx.body = await postModel.create(data, {
    fields: ModifiableFields
  }).then(row => {
    let result = {};
    ctx.status = 201;
    CommonOutputFields.forEach(field => {
      result[field] = row.dataValues[field];
    });
    return result;
  }).catch(err => {
    ctx.status = 500;
    return DB.getErrorMessage(err)
  });
};

module.exports.update = async ctx => {
  const id = ctx.params.id;
  const data = await parse(ctx);
  ctx.body = await postModel.findOne({
    where: {id}
  }).then(row => {
    if (!row) {
      ctx.status = 404;
      return;
    }
    Object.keys(data).forEach(key => {
      if (!data.hasOwnProperty(key) &&
        ModifiableFields.indexOf(key) === -1) {
        return;
      }
      row.set(key, data[key]);
    });
    if (!row.changed()) {
      ctx.status = 204;
    } else {
      return row.save({
        returning: false
      });
    }
  }).then(() => '')
    .catch(err => {
    ctx.status = 500;
    return DB.getErrorMessage(err)
  })
};

module.exports.remove = async ctx => {
  const id = ctx.params.id;
  ctx.body = await postModel.destroy({
    where: {id},
    limit: 1
  }).then(ret => {
    if (!ret) {
      ctx.status = 404;
    }
    return ''
  }).catch(err => {
    ctx.status = 500;
    return DB.getErrorMessage(err)
  })
};
