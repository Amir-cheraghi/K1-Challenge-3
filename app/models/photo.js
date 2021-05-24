const  mongoose  = require("mongoose");

const photoSchema = new mongoose.Schema({
    originalPhotoPath : {type : String},
    smallPhotoPath : {type : String},
    largePhotoPath : {type : String},
    title : {type : String , default : 'Uploaded-Image'},
    width : {type : String},
    height : {type : String},
    size : {type : String}
},{timeStamps : true})


const Photo = mongoose.model('Photos' , photoSchema)

module.exports = Photo





