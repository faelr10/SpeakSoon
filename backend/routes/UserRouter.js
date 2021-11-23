const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verify-token')



router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/acess',UserController.acess)
router.get('/dashboard',verifyToken,UserController.dashboard)
router.patch('/newFriend',verifyToken,UserController.newFriend)
router.get('/searchUser/:id',verifyToken,UserController.searchUser)



module.exports = router