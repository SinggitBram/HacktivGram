'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
    Likes.belongsTo(models.User);
    Likes.belongsTo(models.Post);
  };
  return Likes;
};