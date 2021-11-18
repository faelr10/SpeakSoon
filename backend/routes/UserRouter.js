const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verify-token')



router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/acess',UserController.acess)
router.get('/dashboard',verifyToken,UserController.dashboard)





module.exports = router