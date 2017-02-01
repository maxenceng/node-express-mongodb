/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const Post = require('../models/Post')

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function getAll(req, res) {
    Post.find(function (err, posts) {
        if (err) {
            res.json({
                get: 'could not get the posts!'
            })
        } else {
            res.send(posts)
        }
    })
}

function getOne(req, res) {
    Post.findById(
        req.params.id,
        function (err, post) {
        if (err) {
            res.status(400).json({
                get: 'could not get the post!'
            })
        } else {
            res.send(post)
        }
    })
}

function create(req, res) {
    let post = new Post({
        // user can be changed to req.session.passport.user but needs UserMiddleware
        // to restrict the API to authenticated user only
        user: req.body.user,
        title: req.body.title,
        text: req.body.text
    })

    post.save(function (err) {
        if(err) {
            res.status(400).json({
                post: 'not created!'
            })
        } else {
            res.status(201).send(post)
        }
    })
}

function update(req, res){
    Post.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {text: req.body.text}},
        {upsert: true},
        function(err, updatedPost) {
            if(err) {
                res.status(400).json({
                    put: 'not updated!'
                })
            } else {
                res.json({
                    put: 'updated!'
                })
            }
        })
}

function remove(req, res) {
    Post.findOneAndRemove(
        {_id: req.params.id},
        function (err, deletedPost) {
            if(err) {
                res.status(400).json({
                    delete: 'not deleted!'
                })
            } else {
                res.json({
                    delete: 'deleted!'
                })
            }
        })
}

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = { getAll, getOne, create, update, remove }