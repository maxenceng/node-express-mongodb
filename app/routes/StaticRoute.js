/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const StaticController = require('../controllers/StaticController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/css/bootstrap.min.css', StaticController.bootstrapcss)
router.get('/css/main.css', StaticController.maincss)

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router