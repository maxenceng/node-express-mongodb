/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const favicon = require('serve-favicon')
const logger = require('morgan')
const passport = require('passport')
const app = express()

/**************************************************************
 * PASSPORT CONFIG
 *************************************************************/
require('./app/configs/PassportConfig')


/**************************************************************
 * DATABASE
 *************************************************************/

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/cmsdb')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

/**************************************************************
 * ROUTES INIT
 *************************************************************/

const appRoutes = require('./app/routes/AppRoute')
const PostRoutes = require('./app/routes/PostRoute')
const UserRoutes = require('./app/routes/UserRoute')
const StaticRoutes = require('./app/routes/StaticRoute')


/**************************************************************
 * MIDDLEWARES
 *************************************************************/

app.set('view engine', 'hjs')
app.set('views', __dirname + '/app/views')
app.use(favicon(__dirname + '/app/assets/icon/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    name: 'session',
    secret: 'This is a secret',
    signed: true
}))
app.use(passport.initialize())
app.use(passport.session())

/**************************************************************
 * ROUTING
 *************************************************************/

app.use(appRoutes)
app.use('/api', PostRoutes)
app.use('/auth', UserRoutes)
app.use(StaticRoutes)


/**************************************************************
 * SERVER
 *************************************************************/

app.listen('8000')

/**************************************************************
 * EXPORT FOR TESTS
 *************************************************************/

module.exports = app