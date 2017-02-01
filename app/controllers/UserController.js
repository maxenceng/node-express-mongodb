/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const User = require('../models/User')
const passport = require('passport')
const partials = {header: 'header', footer: 'footer'}

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function getIndex(req, res) {
    res.render('auth/index',
        {user: req.user, partials: partials})
}

function getRegister(req, res) {
    res.render('auth/register',
        {partials: partials})
}

function postRegister(req, res) {
    User.register(new User({
            username: req.body.username
        }),
        req.body.password,
        function(err, user) {
            if(err) {
                return res.render('auth/register', {partials: partials})
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/auth/')
            })
        })
}

function getLogin(req, res) {
    res.render('auth/login', {partials: partials})
}

function getLogout(req, res) {
    req.logout()
    res.redirect('/auth/')
}

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = { getIndex, getRegister, postRegister, getLogin, getLogout }
