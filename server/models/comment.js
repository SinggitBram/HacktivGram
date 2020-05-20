'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    comment: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'comment cannot be empty'
        }
      }
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo( models.User, {foreignKey: 'UserId'} )
    Comment.belongsTo( models.Post, {foreignKey: 'PostId'} )
  };
  return Comment;
};