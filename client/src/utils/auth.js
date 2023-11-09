const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Set the JWT secret key
const JWT_SECRET = 'mysecretkey';

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    username: user.username,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Function to hash a password
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Function to compare a password with a hashed password
async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
};
