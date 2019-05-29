const express = require('express');
// const createError = require('http-errors');
const router = express.Router();
const User = require('../models/user');
const parser = require('./../config/config');


//MIDDLEWARE helper functions
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

//GET PROFILES
router.get('/', isLoggedIn(), (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => console.log(err))
})

//GET PREFERENCES
router.get('/', isLoggedIn(),(req, res, next) => {
  const { _id } = req.session.currentUser;
  console.log('you have a hobbie')

  User.findById(_id)
  .populate('sports')
  .then((myself) => res.json(myself.sports))
  .catch((err) => console.log(err))
})

//GET  'profile/:id' get all users
router.get('/:id', isLoggedIn(),(req, res, next) => {
  const { id } = req.params;
  console.log(id)

  User.findById(id)
  .then((user) => res.json(user))
  .catch((err) => console.log(err))
})

//PUT '/edit'
router.put('/edit', isLoggedIn(), (req, res, next) => {
  const { username, city, sports, email, image} = req.body;
  console.log(req.session.currentUser);
  User.findByIdAndUpdate(req.session.currentUser, {$set: req.body}, {new: true})
   .then((user) => res.json(user))
})

// POST '/edit' images-cloudinary
router.post('/edit', parser.single('photo'), (req, res, next) => {
  console.log('file upload');
  console.log(req.file);
  if (!req.file) {
    next(new Error('No file uploaded!'));
  };
  const image = req.file.secure_url;
  res.json(image).status(200);
});

module.exports = router;
