const frontController = require('./../controller/frontend/frontController')
const router = require('express').Router()

router.route('/')
.get(frontController.showIndex)



module.exports = router