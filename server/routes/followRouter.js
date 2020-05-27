const router = require('express').Router();
const FollowController = require('../controllers/followController');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/', FollowController.getAllFollower);
router.post('/', FollowController.following);
router.get('/following', FollowController.getAllFollowing);
router.delete('/', FollowController.unfollow);

module.exports = router;