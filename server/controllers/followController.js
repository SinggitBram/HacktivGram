const { User, Follow } = require('../models');

class FollowControllers {
  static async getAllFollower (req, res, next) {
    try {
      const follower = await Follow.findAll({ 
        where: { FollowedUserId: req.userdata.id }, 
        includes: [{
          models: User,
          as: 'Follower',
          attributes: ['name']
        }]
      });
      res.status(200).json(follower);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async getAllFollowing (req, res, next) {
    try {
      const following = await Follow.findAll({
        where: { FollowingUserId: req.userdata.id },
        includes: [{
          models: User,
          as: 'Following',
          attributes: ['name']
        }]
      });
      res.status(200).json(following);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async following (req, res, next) {
    try {
      const targetUser = req.body.targetUserId; //User target who will get follower
      const followedUser = await User.findByPk(targetUser); //Check if user avaiable or not
      if (followedUser) {
        const follow = await Follow.create({
          FollowingUserId: targetUser,
          FollowedUserId: req.userdata.id
        });
        res.status(201).json({ message: 'Success following' });
      } else {
        throw new Error('User not available');
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async unfollow (req, res, next) {
    try {
      const targetUser = req.body.targetUserId;
      const followedUser = await User.findByPk(targetUser);
      if (followedUser) {
        const unfollow = await follow.destroy({
          where: {
            FollowedUserId: targetUserId,
            FollowingUserID: req.userdata.id
          }
        });
        res.status(200).json({ message: 'Success unfollowing'});
      } else {
        throw new Error('User not available');
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = FollowControllers;