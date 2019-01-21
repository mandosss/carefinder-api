const mongoose = require('mongoose')

const Schema = mongoose.Schema

//create the hospital schema
const definition = new Schema({
    'apiKey': {
        type: String,
        unique: true,
        minlength: 40,
    },
    'level': {
        type: Number, 
        min:1,
        max:2,
        default: 1
    }, //1 for user, 2 for admin
})

const options = {
    timestamps: true
}

const schema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('ApiKey', schema)
