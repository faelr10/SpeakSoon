const TalkController = require('../controllers/TalkController')

const router = require('express').Router()



router.get('/newtalk/:id',TalkController.newTalk)
router.patch('/newtalk/:id',TalkController.newMessage)
router.get('/showmessage/:id',TalkController.showMessage)








module.exports = router