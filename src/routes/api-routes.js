/*
 *  All server routes are listed here. 
 *  @type {createApplication}
 */

 const express = require('express')
 const userRoutes = require('./user-routes')
 const apikeyRoutes = require('./apikey-routes')
 const authRoutes = require('./auth-routes')
 const hospitalRoutes = require('./hospital-routes')

 const router = express.Router()

 //List all of api routes here relative to /api
 router.use('/users', userRoutes)    //.../api/users
 router.use('/apikeys', apikeyRoutes)
 router.use('/auth', authRoutes)
 router.use('/hospitals', hospitalRoutes)

 module.exports = router