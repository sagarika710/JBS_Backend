const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

exports.comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
