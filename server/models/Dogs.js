const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Big', 'Giant'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns the dog
  },
  

});

module.exports = mongoose.model('Dog', dogSchema);