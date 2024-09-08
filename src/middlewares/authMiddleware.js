const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const authMiddleware = async (req, res, next) => {
 
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if admin exists in decoded token
    if (!decoded.admin) {
      return res.status(401).json({ msg: 'Token does not contain valid admin data' });
    }
    req.admin = decoded.admin;
    next();
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
