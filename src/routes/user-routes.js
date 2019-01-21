const express = require('express')
const userController = require('../controllers/user-controller')
const {catchErrors} = require('../middleware/error-handlers')
const {authenticate} =require('../middleware/auth-handlers')

const router = express.Router()

//user routes
router.get('/', authenticate('admin'), catchErrors(userController.index))
router.get('/:id', authenticate('admin'), catchErrors(userController.show))
router.post('/', authenticate('admin'), catchErrors(userController.store))
router.patch('/:id', authenticate('admin'), catchErrors(userController.update))
router.delete('/:id', authenticate('admin'), catchErrors(userController.destroy))

module.exports = router
