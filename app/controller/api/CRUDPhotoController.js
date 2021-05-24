
const Photo = require('./../../models/photo')
module.exports = new class frontController{

    async getAllPhoto(req,res,next){
    const data = await Photo.find()
        res.json({
            status : 'success',
            data 
        })
    }

}