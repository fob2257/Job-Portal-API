require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = {
  issue(payload, expiresIn) {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  },
  verify(token) {
    return jwt.verify(token, secret);
  },
};
