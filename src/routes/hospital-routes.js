const express = require('express')
const hospitalController = require('../controllers/hospital-controller')
const {catchErrors} = require('../middleware/error-handlers')
const {authenticate} =require('../middleware/auth-handlers')


const router = express.Router()

router.get('/', authenticate('user'), catchErrors(hospitalController.index))
router.post('/', authenticate('admin'), catchErrors(hospitalController.store))
router.delete('/', authenticate('admin'), catchErrors(hospitalController.destroy))

//hospital id
router.get('/id/:number', authenticate('user'), catchErrors(hospitalController.getId))
router.put('/id/:number', authenticate('admin'), catchErrors(hospitalController.putId))
router.delete('/id/:number', authenticate('admin'), catchErrors(hospitalController.deleteId))

//hospitals by city
router.get('/city/:name', authenticate('user'), catchErrors(hospitalController.getCity))
router.delete('/city/:name', authenticate('admin'), catchErrors(hospitalController.deleteCity))

//hospitals by state
router.get('/state/:name', authenticate('user'), catchErrors(hospitalController.getState))
router.delete('/state/:name', authenticate('admin'), catchErrors(hospitalController.deleteState))

//hospitals by county
router.get('/county/:name', authenticate('user'), catchErrors(hospitalController.getCounty))
router.delete('/county/:name',authenticate('admin'), catchErrors(hospitalController.deleteCounty))

//hospitals by state && city
router.get('/statecity/:nameState/:nameCity', authenticate('user'), catchErrors(hospitalController.getStateCity))
router.delete('/statecity/:nameState/:nameCity', authenticate('admin'), catchErrors(hospitalController.deleteStateCity))

//hispitals by name
router.get('/name/:name', authenticate('user'), catchErrors(hospitalController.getName))
router.delete('/name/:name', authenticate('admin'), catchErrors(hospitalController.deleteName))

//hospitals by type
router.get('/type/:type', authenticate('user'), catchErrors(hospitalController.getType))
router.delete('/type/:type', authenticate('admin'), catchErrors(hospitalController.deleteType))

//hospitals by ownership
router.get('/ownership/:owner',authenticate('user'), catchErrors(hospitalController.getOwner))
router.delete('/ownership/:owner', authenticate('admin'), catchErrors(hospitalController.deleteOwner))

//hospitals by emergency
router.get('/emergency/:boolean', authenticate('user'), catchErrors(hospitalController.getEmergency))
router.delete('/emergency/:boolean', authenticate('admin'), catchErrors(hospitalController.deleteEmergency))

//hospitals by distance
router.get('/latlon/:latitude/:longitude/:distance', authenticate('user'), catchErrors(hospitalController.getLatLon))
router.delete('/latlon/:latitude/:longitude/:distance', authenticate('admin'), catchErrors(hospitalController.deleteLatLon))

module.exports = router
