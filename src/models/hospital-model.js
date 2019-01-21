const mongoose = require('mongoose')

const Schema = mongoose.Schema

//create the hospital schema
const definition = new Schema({
    'provider_id': Number,
    'hospital_name': String,
    'address': String,
    'city': String,
    'state': String, 
    'zip_code': Number,
    'county_name': String,
    'phone_number': Number,
    'hospital_type': String,
    'hospital_ownership': String,
    'emergency_services': String,
    'location': {
        'type': Object,
        'coordinates': [
            Number, Number
        ]
    }
})

const options = {
    timestamps: true
}

const schema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('Hospital', schema)
