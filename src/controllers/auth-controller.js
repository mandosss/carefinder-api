const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var config = require('../../config')


//creates user
exports.createUser = async(req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, config.salts)
    
    const user = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: hashedPassword,
    })

    await user.save()

    var token = jwt.sign({id: user._id}, config.secrets,{
        expiresIn: 86400
    })

    res.status(200).json({ auth: true, token: token})
}

//loginin
exports.postLogin = async(req, res) => {
    User.findOne({ email: req.body.email }, async function (err, user) {
        if (err) return res.status(500).send({message:'Error on the server.'})
        if (!user) return res.status(404).send({message:'No user found.'})
    
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password)

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    
        var token = jwt.sign({ id: user._id }, config.secrets, {
          expiresIn: 86400 // expires in 24 hours
        })
    
        res.status(200).send({ auth: true, token: token })
      })
}

//logout
exports.getLogout = async(req, res) => {
    res.status(200).send({ auth: false, token: null })
}

//reauthenticate
exports.getReAuth = async(req, res) => {
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
  
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    
        res.status(200).send(decoded)
    })
}