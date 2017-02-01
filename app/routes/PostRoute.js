/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const router = require('express').Router()
const PostController = require('../controllers/PostController')

/**************************************************************
 * ROUTES
 *************************************************************/

router.get('/', PostController.getAll)
router.get('/:id', PostController.getOne)
router.post('/', PostController.create)
router.put('/:id', PostController.update)
router.delete('/:id', PostController.remove)



/**************************************************************
 * EXPORT
 *************************************************************/

module.exports = router
