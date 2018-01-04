'use strict';
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    distance: DataTypes.INTEGER
  });

  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Profile, {
      foreignKey: 'locationId'
    });
  };

  return Location;
};
