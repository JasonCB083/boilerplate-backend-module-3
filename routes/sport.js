const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const User = require('../models/user');
const Sport = require('../models/sport');

//MIDDLEWARE helper functions
const {isLoggedIn, isNotLoggedIn, validationLoggin,} = require('../helpers/middlewares');

//GET  '/sport' get all users sport
router.get('/', isLoggedIn(),(req, res, next) => {

  const { _id} = req.session.currentUser;

  User.findById(_id).populate('sport')
  .then((user) => res.json(user))
  .catch((err) => console.log(err))
})

//POST '/sport' add new sport object to user
router.post('/', isLoggedIn(), (req, res, next) => {
  const { type } = req.body;
  console.log(req.session.currentUser);

  Sport.create({
    type,
    owner: req.session.currentUser._id
  }, {
    new: true
  })
    .then((newSport) => {
      console.log('NEW SPORT',newSport)
      User.findByIdAndUpdate(req.session.currentUser._id, { $push: { sport: newSport[0]._id } }, { new: true })
        .then((data) => {
          res
            .status(201)
            .json(data);
        })
        .catch((err) => {
          res
            .status(500)
            .json(err)
        })
    })
  })
module.exports = router;
