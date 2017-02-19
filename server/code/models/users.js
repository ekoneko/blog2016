/**
 * @file user model
 */
const Sequelize = require('sequelize');

module.exports = {
  name: 'users',
  attributes: {
    name: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true
    },
    role: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    salt: {
      type: Sequelize.STRING(6),
      allowNull: false
    }
  },
  options: {}
};
