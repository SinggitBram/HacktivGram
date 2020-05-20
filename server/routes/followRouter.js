const router = require('express').Router();
const FollowController = require('../controllers/followController');

router.get('/', FollowController.getAllFollower);
router.post('/', FollowController.following);
router.get('/following', FollowController.getAllFollowing);
router.delete('/', FollowController.unfollow);

module.exports = router;