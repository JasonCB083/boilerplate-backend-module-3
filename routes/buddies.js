const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/user');

//MIDDLEWARE functions
const {isLoggedIn, isNotLoggedIn, validationLoggin,} = require('../helpers/middlewares');

//  POST '/buddies'   add user buddie
router.post('/', isLoggedIn(), (req, res, next) => {
  const { userId, buddieId } = req.body;

  let favId = mongoose.Types.ObjectId(buddieId);

  User.findByIdAndUpdate(userId, { $push: { buddies: favId }} , {new: true}) ////push baby

  .then((user) => res.json(user))
  .catch((err) => res.status(400).send(err))
})

//GET '/buddies/' gets all user buddies
router.get('/', isLoggedIn(),(req, res, next) => {
  const { _id } = req.session.currentUser;
  console.log('heyyyyyy')

  User.findById(_id)
  .populate('buddies')
  .then((myself) => res.json(myself.buddies))
  .catch((err) => console.log(err))
})



//DELETE '/buddieId'
router.delete('/:buddieId', isLoggedIn(), (req,res,next) => {
  const { buddieId } = req.params;
  const { _id } = req.session.currentUser;

  User.findByIdAndUpdate( _id, { $pull: {buddies: buddieId } }, {new: true})
    .then((data) => res.json(data))
    .catch((err) => console.log(err))

})

module.exports = router;
