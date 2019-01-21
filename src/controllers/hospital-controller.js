const Hospital = require('../models/hospital-model')

//GET http://localhost:3000/api/users
//index returns an array of objects
exports.index = async(req, res) => {
    const hospitals = await Hospital.find().exec()
    res.json({ data: hospitals})
}
exports.store =async(req, res) => {
    const hospitals = new Hospital(req.body)
    await hospitals.save()
    res.status(201).json({ data: hospitals})
}
exports.destroy = async(req, res) => {
    await Hospital.find().remove().exec()
    res.status(204).send({message:'All hospitals deleted'})
}

//by id
exports.getId =async(req, res) => {
    const hospitals = await Hospital.find({provider_id: req.params.number}).exec()
    res.json({ data: hospitals}) 
}
exports.putId =async(req, res) => {
    const hospitals = await Hospital.findOneAndUpdate({provider_id: req.params.number}, 
        {$set: req.body}, {upsert:true, new: true}).exec()
    res.json({data: hospitals})
}
exports.deleteId = async(req, res) => {
    await Hospital.find({provider_id: req.params.number}).remove().exec()
    res.status(204).send({message:'Hospital deleted'})
}

//by city
exports.getCity =async(req, res) => {
    const hospitals = await Hospital.find({city: req.params.name.toUpperCase()}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteCity = async(req, res) => {
    await Hospital.find({city: req.params.name.toUpperCase()}).remove().exec()
    res.status(204).send({message:'Hospital(s) deleted in ' + req.params.name})
}

//by state
exports.getState =async(req, res) => {
    const hospitals = await Hospital.find({state: req.params.name.toUpperCase()}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteState = async(req, res) => {
    await Hospital.find({state: req.params.name.toUpperCase()}).remove().exec()
    res.status(204).send()
}

//by county
exports.getCounty =async(req, res) => {
    const hospitals = await Hospital.find({county_name: req.params.name.toUpperCase()}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteCounty = async(req, res) => {
    await Hospital.find({county_name: req.params.name.toUpperCase()}).remove().exec()
    res.status(204).send()
}

//by state and city
exports.getStateCity =async(req, res) => {
    const hospitals = await Hospital.find({state: req.params.nameState.toUpperCase(), 
        city: req.params.nameCity.toUpperCase()}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteStateCity = async(req, res) => {
    await Hospital.find({state: req.params.nameState.toUpperCase(),
         city: req.params.nameCity.toUpperCase()}).remove().exec()
    res.status(204).send()
}

//by hospital's name
exports.getName =async(req, res) => {
    const hospitals = await Hospital.find({hospital_name: req.params.name.toUpperCase()}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteName = async(req, res) => {
    await Hospital.find({hospital_name: req.params.name.toUpperCase()}).remove().exec()
    res.status(204).send()
}

//by type
exports.getType =async(req, res) => {
    const hospitals = await Hospital.find({hospital_type: req.params.type}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteType = async(req, res) => {
    await Hospital.find({hospital_type: req.params.type}).remove().exec()
    res.status(204).send()
}

//by ownership
exports.getOwner =async(req, res) => {
    const hospitals = await Hospital.find({hospital_ownership: req.params.owner}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteOwner = async(req, res) => {
    await Hospital.find({hospital_ownership: req.params.owner}).remove().exec()
    res.status(204).send()
}

//by emergency (working as strings...)
exports.getEmergency = async(req, res) => {
    const hospitals = await Hospital.find({emergency_services: req.params.boolean.toLowerCase()}).exec()
    res.json({ data: hospitals}) 
}
exports.deleteEmergency = async(req, res) => {
    await Hospital.find({emergency_services: req.params.boolean.toLowerCase()}).remove().exec()
    res.status(204).send()
}

//by locations and proximity within a given range
exports.getLatLon =async(req, res) => {
    const hospitals = await Hospital.find({
        location: {    
            $geoWithin: {
                $centerSphere: [[parseFloat(req.params.longitude), parseFloat(req.params.latitude)],
                parseFloat(req.params.distance/3963.2)]
            }
        }
        }).sort().exec()
    res.json({ data: hospitals}) 
}
exports.deleteLatLon = async(req, res) => {
    await Hospital.find({
        location: {    
            $geoWithin: {
                $centerSphere: [[parseFloat(req.params.longitude), parseFloat(req.params.latitude)],
                parseFloat(req.params.distance/3963.2)]
            }
        }
    }).deleteMany().exec()
    res.status(204).send()
}
