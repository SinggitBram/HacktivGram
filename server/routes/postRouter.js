const router = require('express').Router()
const PostController = require('../controllers/postController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.get('/all', PostController.getPostAll) // get all post in hacktivgram
router.get('/all/:id', PostController.getPostAllbyId) // get post in hacktivgram by id
router.get('/user/:UserId', PostController.getPostUserId) // get post by userid
router.post('/', authentication, PostController.addPost)
router.get('/', authentication, PostController.getPost)
router.get('/following', authentication, PostController.following)
router.get('/:id', authentication, authorization, PostController.getPostId)
router.put('/:id', authentication, authorization, PostController.editPost)
router.delete('/:id', authentication, authorization, PostController.deletePost)


module.exports = router