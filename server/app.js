const express = require('express');
const verifyRole = require('./utils/roleMiddleware');

const app = express();

app.post('/admin', verifyRole(['admin']), (req, res) => {
  res.send('Welcome Admin!');
});

app.get('/owner', verifyRole(['owner']), (req, res) => {
  res.send('Welcome Owner!');
});

app.get('/walker', verifyRole(['walker']), (req, res) => {
  res.send('Welcome Walker!');
});

module.exports = app;
