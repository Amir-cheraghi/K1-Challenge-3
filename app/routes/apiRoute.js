const router = require('express').Router()
const apiController = require('./../controller/api/CRUDPhotoController')
router.route('/photos')
.get(apiController.getAllPhoto)



module.exports = router