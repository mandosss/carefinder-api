const User = require('../models/user-model')
const ApiKey = require('../models/apikey-model')
const jwt = require('jsonwebtoken')
var config = require('../../config')

//validates data that n eeds to be entered into the server
exports.validateUser = async(req, res, next) => {
    const uName = req.body.userName
    const uEmail = req.body.email
    const uPassword = req.body.password
    if( uName && uEmail && uPassword){
        if(uPassword.length > 7){
            const userData = await User.find({ $or: [{userName: uName}, {email: uEmail}] })
                .then(result => { return result !== null})
            if(userData){
                next()
            }
            else{
                return res.status(400).send({
                    success: false,
                    message: 'Please, choose a different user name or if you already have signed up before, use a different email.'
                })
            }
        }
        else{
            return res.status(400).send({
                success: false,
                message: 'Minimum password length is 8'
            })
        }
    }
    else{
        return res.status(400).send({
            success: false,
            message: 'Missing data.'
        })
    }
}

exports.authenticate = (inputRole) => async(req, res, next) => {
    const apikeyHeader = req.get('X-API-KEY')
    const token = req.get('x-access-token')
    //if neither key or token are provided
    if (!token && !apikeyHeader) return res.status(401).send({ auth: false, message: 'No token or APIKEY provided.' })
    //handles the token
    else if(token){
        jwt.verify(token, config.secrets, async(err, decoded) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
            User.findById(decoded.id, async (err, user) => {
                if (err) return res.status(500).send("There was a problem finding the user.")
                
                if (user.role === 'admin') next()
                else if(inputRole === 'user') {
                    if(user.role === 'user'){
                        next()
                    }
                }
                else return res.status(404).send("Not enough credentials found.")
            })
        })
    }
    //handles the apikey
    else if(apikeyHeader){
        const apikeyval = await ApiKey.findOne({apiKey: apikeyHeader})
        if(apikeyval){
            if(apikeyval.level === 2) {var apikeyLevel = 'admin'}
            else {var apikeyLevel = 'user'}

            if(apikeyLevel == 'admin') next()
            else if(inputRole === 'user'){
                if(apikeyLevel === 'user') next()
            }
            else return res.status(404).send("Not enough credentials found.")
        }
        else return res.status(404).send("Please obtain an APIEKEY.")
    }


}
 