const router = require('express').Router()
const CommentController = require('../controllers/commentController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, CommentController.addComment)
// router.get('/', authentication, CommentController.getComment)
router.get('/:id', authentication, authorization, CommentController.getCommentId)
router.put('/:id', authentication, authorization, CommentController.editComment)
router.delete('/:id', authentication, authorization, CommentController.deleteComment)

module.exports = router