const multer = require('multer')
const path = require('path')
const storage =multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./src/public/uploads/originalSize')
    },
    filename : (req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`)
    }
})

var upload = multer({ storage })


module.exports = upload