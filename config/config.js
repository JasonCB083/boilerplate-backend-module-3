const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: 'dcrzwptl0',
  api_key: '322176642271823',
  api_secret: 'EBy8wtLChNNWMTLiXiJlXHnZdH8'
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png']
})

const parser = multer({ storage: storage })

module.exports = parser
