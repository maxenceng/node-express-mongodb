/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const mongoose = require('mongoose')

/**************************************************************
 * MODEL
 *************************************************************/

const PostSchema = new mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    created_at: {type: Date, required: true, default: Date.now },
    updated_at: Date
})

const Post = mongoose.model('Post', PostSchema)


/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = Post