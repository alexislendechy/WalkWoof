const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  size: {
    type: String,
    enum: ['small', 'medium', 'big', 'giant'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns the dog
  },
  // Add other dog-related fields here
});

module.exports = mongoose.model('Dog', dogSchema);