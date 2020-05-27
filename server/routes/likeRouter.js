const router = require('express').Router()
const LikeController = require('../controllers/likeController')
const authentication = require('../middlewares/authentication')

router.post('/', authentication, LikeController.addLike)
router.get('/:PostId', authentication, LikeController.getLike)
router.delete('/:id', authentication, LikeController.deleteLike)

module.exports = router