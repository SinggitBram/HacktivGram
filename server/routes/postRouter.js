const router = require('express').Router()
const PostController = require('../controllers/postController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// router.post('/', authentication, PostController.addPost)
// router.get('/', authentication, PostController.getPost)
// router.get('/:id', authentication, authorization, PostController.getPostId)
// router.put('/:id', authentication, authorization, PostController.editPost)
// router.delete('/:id', authentication, authorization, PostController.deletePost)


router.post('/',  PostController.addPost)
router.get('/',  PostController.getPost)
router.get('/:id', PostController.getPostId)
router.put('/:id', PostController.editPost)
router.delete('/:id', PostController.deletePost)

module.exports = router