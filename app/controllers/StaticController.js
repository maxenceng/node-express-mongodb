/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const path = require('path')

/**************************************************************
 * CONTROLLERS
 *************************************************************/

function bootstrapcss(req, res) {
    res.sendFile(path.join(__dirname, '/../assets/css/bootstrap.min.css'))
}

function maincss(req, res) {
    res.sendFile(path.join(__dirname, '/../assets/css/main.css'))
}

/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = { bootstrapcss, maincss }

