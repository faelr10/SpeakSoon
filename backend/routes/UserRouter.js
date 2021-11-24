const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verify-token')

const { imageUpload } = require('../helpers/image-upload')




router.post('/register',imageUpload.single("image"),UserController.register)
router.post('/login',UserController.login)
router.get('/acess',UserController.acess)
router.get('/dashboard',verifyToken,UserController.dashboard)
router.patch('/newFriend',verifyToken,UserController.newFriend)
router.get('/searchUser/:id',verifyToken,UserController.searchUser)



module.exports = router