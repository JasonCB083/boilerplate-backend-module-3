const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const sportSchema = new Schema ({
  type: String, enum:['climbing', 'soccer', 'baseball', 'volleyball', 'basketball', 'tennis', 'football', 'snowboard', 'ping pong', 'surfing', 'paddle', 'squash', 'swimming', 'yoga', 'karate', 'skiing', 'skateboarding'],

  owner:  [{
    type: ObjectId,
    ref: 'User'
}]
});

const Sport = mongoose.model( 'Sport' , sportSchema);

module.exports = Sport;
