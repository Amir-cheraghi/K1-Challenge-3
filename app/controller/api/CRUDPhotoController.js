
const Photo = require('./../../models/photo')
const jimp = require('jimp')
const path = require('path')
const sizeOf = require('image-size')
const { promisify } = require('util')
const { unlink } = require('fs')
const removeFile = promisify(unlink)

module.exports = new class frontController {

    async getAllPhoto(req, res, next) {
        const data = await Photo.find()
        res.json({
            status: 'success',
            data
        })
    }

    async getSinglePhoto(req, res, next) {
        const data = await Photo.findById(req.params.id)
        res.json({
            status: 'success',
            data
        })
    }

    async addPhoto(req, res) {
        try {
            const titles = req.body.title.split(',')
            const data = []
            for (const [i, el] of req.files.entries()) {
                const originalPhotoPath = path.join(process.cwd(), el.path)
                const smallPhotoPath = `/uploads/smallSize/${Date.now()}--${el.originalname}`
                const largePhotoPath = `/uploads/largeSize/${Date.now()}--${el.originalname}`

                const originalImage = await jimp.read(originalPhotoPath)
                originalImage
                    .resize(327, 327)
                    .write(path.join(process.cwd(), `src/public${smallPhotoPath}`))

                originalImage
                    .resize(849, 849)
                    .write(path.join(process.cwd(), `src/public${largePhotoPath}`))

                const size = await sizeOf(originalPhotoPath)

                const photos = await Photo.create({
                    originalPhotoPath: el.path.replace('src\\public\\', ''),
                    smallPhotoPath,
                    largePhotoPath,
                    title: titles[i],
                    width: size.width,
                    height: size.height,
                    size: `${el.size} Byte`
                })
                data.push(photos)
                //Save Path To a const and Save All Db From Upload/...

            }
            res.json({
                status: 'success',
                msg: 'All Files Successfully Uploaded',
                data: data
            })
        } catch (err) {
            console.log(err)
        }
    }


    async deleteAllPhotos(req, res) {
        try {
            const data = await Photo.find()

            data.forEach(async el => {
                await removeFile(`${process.cwd()}/src/public/${el.originalPhotoPath}`)
                await removeFile(`${process.cwd()}/src/public${el.smallPhotoPath}`)
                await removeFile(`${process.cwd()}/src/public${el.largePhotoPath}`)
                await Photo.findByIdAndDelete(el._id)
            })
            res.json({
                status: 'success',
                msg: 'All File Successfully Deleted'
            })
        } catch (err) {
            console.log(err)
        }
    }



    async deletePhotoById(req, res) {
        try {
            const data = await Photo.findById(req.params.id)
            await removeFile(`${process.cwd()}/src/public/${data.originalPhotoPath}`)
            await removeFile(`${process.cwd()}/src/public${data.smallPhotoPath}`)
            await removeFile(`${process.cwd()}/src/public${data.largePhotoPath}`)
            await Photo.findByIdAndDelete(req.params.id)

            res.json({
                status: 'success',
                msg: `${data.title} Successfully Deleted`
            })
        } catch (err) {
            console.log(err)
        }
    }


    async editPhoto(req, res) {
        try {

            const photo = await Photo.findById(req.params.id)

            if (req.file) {
                const originalPhotoPath = path.join(process.cwd(), req.file.path)
                const smallPhotoPath = `/uploads/smallSize/${Date.now()}--${req.file.originalname}`
                const largePhotoPath = `/uploads/largeSize/${Date.now()}--${req.file.originalname}`
                const originalImage = await jimp.read(originalPhotoPath)
                originalImage
                    .resize(327, 327)
                    .write(path.join(process.cwd(), `src/public${smallPhotoPath}`))

                originalImage
                    .resize(849, 849)
                    .write(path.join(process.cwd(), `src/public${largePhotoPath}`))

                const size = await sizeOf(originalPhotoPath)
                await removeFile(`${process.cwd()}/src/public/${photo.originalPhotoPath}`)
                await removeFile(`${process.cwd()}/src/public${photo.smallPhotoPath}`)
                await removeFile(`${process.cwd()}/src/public${photo.largePhotoPath}`)
                    photo.originalPhotoPath = req.file.path.replace('src\\public\\', ''),
                    photo.smallPhotoPath = smallPhotoPath
                    photo.largePhotoPath = largePhotoPath
                    photo.title = req.body.title || photo.title,
                    photo.width = size.width,
                    photo.height = size.height,
                    photo.size = `${req.file.size} Byte`


                await photo.save()


            } else {
                photo.title = req.body.title
                await photo.save()
            }
            res.json({
                status: 'success',
                msg: 'Photo Successfully Edited',
                data: photo
            })
        } catch (err) {
            console.log(err)
        }
    }
}

