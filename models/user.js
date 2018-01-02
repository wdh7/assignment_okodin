'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Username cannot be empty'},
        isAlpha: {msg: 'Username must only be alphabetic'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Email cannot be empty'},
        isEmail: {msg: 'Email is invalid'}
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
