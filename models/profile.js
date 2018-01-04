'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    age: DataTypes.INTEGER,
    about: DataTypes.TEXT,
    talents: DataTypes.TEXT,
    favThings: DataTypes.TEXT,
    whyMe: DataTypes.TEXT,
    gender: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    height: DataTypes.INTEGER,
    bodyType: DataTypes.STRING,
    children: DataTypes.BOOLEAN,
    occupation: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  });

  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Profile.belongsTo(models.Location, {
      foreignKey: 'locationId'
    });
  };

  return Profile;
};
