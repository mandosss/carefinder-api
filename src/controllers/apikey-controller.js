const ApiKey = require('../models/apikey-model')
const apikeygen = require('apikeygen').apikey

//index returns all apikeys
//ADMIN level
exports.getApiKeys = async(req, res) => {
    const apikey = await ApiKey.find().exec()
    res.json({ data: apikey})
}

//requests a new key NOT FINiSHED
exports.getApiKey =async(req, res) => {
    const apikey = apikeygen()
    res.json({data: apikey}) 
}

//gets APIKEY
//ADMIN level
exports.getSpecificApiKey =async(req, res) => {
    const apikey = await ApiKey.find({apiKey: req.params.key}).exec()
    res.json({ data: apikey}) 
}
//deletes api key   
exports.deleteApiKey = async(req, res) => {
    await ApiKey.find({apiKey: req.params.key}).remove().exec()
    res.status(204).send({message: 'Key deleted!'})
}

//post of api key with level
exports.postApiKey =async(req, res) => {
    const apikey = new ApiKey({apiKey: req.params.key, level: req.params.level})
    await apikey.save()
    res.status(201).send({message: 'Success!'})
}
