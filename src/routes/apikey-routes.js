const express = require('express')
const apikeyController = require('../controllers/apikey-controller')
const {catchErrors} = require('../middleware/error-handlers')
const {authenticate} =require('../middleware/auth-handlers')
const router = express.Router()

//get all apikeys
router.get('/keys', authenticate('admin'), catchErrors(apikeyController.getApiKeys))

//request apikey
router.get('/key', catchErrors(apikeyController.getApiKey))

//get specific apikey
router.get('/key/:key', authenticate('admin'), catchErrors(apikeyController.getSpecificApiKey))    

//deletes specific apikey
router.delete('/key/:key', authenticate('user'), catchErrors(apikeyController.deleteApiKey))

//verifies apikey with a level of security
router.post('/key/:key/:level', catchErrors(apikeyController.postApiKey))

module.exports = router
