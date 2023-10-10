const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. Token is missing.' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });

    req.user = user;
    next();
  });
};
