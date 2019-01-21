const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')
const {catchErrors} = require('../middleware/error-handlers')
const {validateUser} = require('../middleware/auth-handlers')

router.post('/register', validateUser, catchErrors(authController.createUser))
router.post('/login', catchErrors(authController.postLogin))
router.get('/logout', catchErrors(authController.getLogout))
router.get('/me', catchErrors(authController.getReAuth)) //reauthenticate

module.exports = router
