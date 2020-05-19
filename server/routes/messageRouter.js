const router = require('express').Router()
const MessageController = require('../controllers/messageController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, MessageController.addMessage)
router.get('/', authentication, MessageController.getMessage)
router.get('/:id', authentication, authorization, MessageController.getMessageId)
router.put('/:id', authentication, authorization, MessageController.editMessage)
router.delete('/:id', authentication, authorization, MessageController.deleteMessage)

module.exports = router