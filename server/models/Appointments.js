const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  walker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Walker is also a User, but with a different role
    required: true,
  },
  petProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog', // Reference to the Dog model
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
