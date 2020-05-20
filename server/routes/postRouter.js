const router = require('express').Router()
const PostController = require('../controllers/postController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, PostController.addPost)
router.get('/', authentication, PostController.getPost)
router.get('/:id', authentication, authorization, PostController.getPostId)
router.put('/:id', authentication, authorization, PostController.editPost)
router.delete('/:id', authentication, authorization, PostController.deletePost)


module.exports = router