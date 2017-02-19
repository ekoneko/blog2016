'use strict';
require('dotenv').config();
const crypto = require('crypto');
const argv = require('argv');
const DB = require('../code/services/db');

argv.option({
  name: 'name',
  short: 'n',
  type: 'string'
});
argv.option({
  name: 'email',
  short: 'e',
  type: 'string'
});
argv.option({
  name: 'password',
  short: 'p',
  type: 'string',
  description: 'raw password'
});
argv.option({
  name: 'role',
  short: 'r',
  type: 'string',
  description: 'which role the user is, like super'
});
const args = argv.run().options;

if (!args.name || !args.email || !args.password || !args.role) {
  console.error('Error: Missing arguments');
  argv.help();
}
DB.createInstance({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT
});

let password = crypto.createHash('md5').update(args.password).digest('hex');
let salt = Math.random().toString(36).slice(-6);
password = crypto.createHash('md5').update(password + salt).digest('hex');

DB.getInstance().model('users').create({
  name: args.name,
  email: args.email,
  role: args.role,
  password,
  salt
});
