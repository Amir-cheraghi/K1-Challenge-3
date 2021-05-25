const router = require('express').Router()
const apiController = require('./../controller/api/CRUDPhotoController')
const multer = require('./../util/multer')


router.route('/photos')
.get(apiController.getAllPhoto)
.post(multer.array('photos',10),apiController.addPhoto)
.delete(apiController.deleteAllPhotos)

router.route('/photos/:id')
.get(apiController.getSinglePhoto)
.delete(apiController.deletePhotoById)



module.exports = router