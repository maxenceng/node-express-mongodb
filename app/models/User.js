/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


/**************************************************************
 * MODEL
 *************************************************************/

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}
})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)


/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = User