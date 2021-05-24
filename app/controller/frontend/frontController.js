
const axios = require('axios').default
module.exports = new class frontController{
   async showIndex(req,res,next){
    const photosRequest = await axios.get(`${req.protocol}://${req.hostname}:3000/api/photos`)
        res.render('index',{
            data : photosRequest.data.data
        })
    }

}