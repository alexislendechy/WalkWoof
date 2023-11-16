const express = require('express');
const verifyRole = require('./utils/roles');
const User = require('./models/User');

const app = express();

app.get('/admin/users', verifyRole(['admin']), (req, res) => {
  try {
    const users = User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.delete('/admin/users/:userId', verifyRole(['admin']), async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      res.status(404).send('User not found');
    }
    res.send('User deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});



app.get('/owner', verifyRole(['owner']), (req, res) => {
  res.send('Welcome Owner!');
});

app.get('/walker', verifyRole(['walker']), (req, res) => {
  res.send('Welcome Walker!');
});

module.exports = app;
