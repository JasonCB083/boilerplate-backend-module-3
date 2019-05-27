const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  city: String,
  image: String,
  sport: [{ type: ObjectId, ref: 'Sport'}],
  buddies: [{ type: ObjectId, ref: 'User'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
