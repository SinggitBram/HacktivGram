'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    FollowingUserId: DataTypes.INTEGER,
    FollowedUserId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return Follow;
};