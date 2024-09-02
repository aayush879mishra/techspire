const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require('../models/adminModel');

module.exports = async (req, res, next) => {
  // Get the token from the headers
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    
    // Attach the admin to the request object
    req.admin = await Admin.findById(decoded.admin.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
