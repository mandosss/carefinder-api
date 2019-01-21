const User = require('../models/user-model')

//GET http://localhost:3000/api/users
//index returns an array of user, excluding their password
exports.index = async(req, res) => {
    const users = await User.find({}, {password: 0}).exec()
    res.json({ data: users})
}
//posts user(s)
exports.store =async(req, res) => {
    const user = new User(req.body)
    await user.save()
    res.status(201).json({ data: user})
}
//show returns a single user
exports.show =async(req, res) => {
    const user = await User.findById(req.params.id, {password: 0}).exec()
    res.json({ data: user}) 
}
// deletes user by _id
exports.destroy =async(req, res) => {
    await User.findByIdAndRemove(req.params.id).exec()
    res.status(204).send()
}
//puts user by id
exports.update = async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, 
        {$set: req.body}, {new: true}).exec()
    res.json({data: user})
}
