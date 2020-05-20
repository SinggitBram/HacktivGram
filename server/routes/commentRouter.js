const router = require('express').Router()
const CommentController = require('../controllers/commentController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, CommentController.addComment)
// router.get('/', authentication, CommentController.getComment)
router.get('/:id', authentication, CommentController.getCommentId)
router.put('/:id', authentication, CommentController.editComment)
router.delete('/:id', authentication, CommentController.deleteComment)

module.exports = router