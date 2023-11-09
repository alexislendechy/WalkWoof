
const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'You must provide text for your comment.',
    minlength: 1,
    maxlength: 280,
    
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
