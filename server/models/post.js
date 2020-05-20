'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    views: DataTypes.INTEGER,
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    origin_userid: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    // Post.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Post;
};