const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: 'dcrzwptl0',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png']
})

const parser = multer({ storage: storage })

module.exports = parser
