/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const passport = require('passport')
const UserController = require('../controllers/UserController')
const UserMiddleware = require('../middlewares/UserMiddleware')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/', UserController.getIndex)

router.get('/register', UserController.getRegister)

router.post('/register', UserController.postRegister)

router.get('/login', UserMiddleware.authenticated,UserController.getLogin)

router.post('/login', passport.authenticate('local', {
        successRedirect: '/auth/',
        failureRedirect: '/auth/register'
}))

router.get('/logout', UserController.getLogout)


/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
