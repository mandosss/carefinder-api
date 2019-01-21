const mongoose = require('mongoose')

const Schema = mongoose.Schema

//create the user schema
const definition = new Schema({
    'firstName': String,
    'lastName': String,
    'email': {type: String, unique: true, required: true, trim: true},
    'userName': {type: String, unique: true, required: true},
    'password': {type: String, required: true},
    'role':{
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    }
})

const options = {
    timestamps: true
}

const schema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('User', schema)
