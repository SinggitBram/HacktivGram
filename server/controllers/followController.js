const { User, Follow } = require('../models');

class FollowControllers {
  static async getAllFollower (req, res, next) {
    try {
      const follower = await User.findAll({
        include: [{
          model: Follow,
          where: { FollowingUserId: req.userdata.id },
          as: 'follower',
          attributes: { exclude: [
            'FollowingUserId',
            'id',
            'FollowedUserId',
            'createdAt',
            'updatedAt'
          ] }
        }],
        attributes: ['id','name', 'image']
      });

      res.status(200).json(follower);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async getAllFollowing (req, res, next) {
    try {
      const following = await User.findAll({
        include: [{
          model: Follow,
          as: 'following',
          where: { FollowedUserId: req.userdata.id },
          attributes: { exclude: [
            'FollowingUserId',
            'id',
            'FollowedUserId',
            'createdAt',
            'updatedAt'
          ] }
        }],
        attributes: ['id','name', 'image']
      })


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