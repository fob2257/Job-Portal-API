require('dotenv').config();
const bcrypt = require('bcrypt');

const salt = process.env.ROUNDS;

module.exports = {
  async hashPassword(pwd) {
    try {
      return await bcrypt.hash(pwd, salt);
    } catch (error) {
      throw error;
    }
  },
  async comparePassword(pwd, hash) {
    try {
      return await bcrypt.compare(pwd, hash);
    } catch (error) {
      throw error;
    }
  }
};
