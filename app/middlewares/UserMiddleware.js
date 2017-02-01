/**************************************************************
 * MIDDLEWARES
 *************************************************************/

function loginRequired(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/auth/')
    }
    next()
}

function authenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/auth/')
    }
    next()
}

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = { loginRequired, authenticated }
