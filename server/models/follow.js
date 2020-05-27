'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    FollowingUserId: DataTypes.INTEGER,
    FollowedUserId: DataTypes.INTEGER,
    // UserId: 
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { foreignKey: "FollowingUserId", as: 'following'});
    Follow.belongsTo(models.User, { foreignKey: "FollowedUserId", as: 'follower'});
  };
  return Follow;
};