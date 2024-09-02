const Admin = require('../models/adminModel'); // Import the Admin model
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const bcrypt = require('bcryptjs'); // For password hashing and comparison
const config = require('config'); // To access configuration, such as JWT secret

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    // Create a new admin
    admin = new Admin({ username, email, password, role });

    // Save the admin to the database
    await admin.save();

    // Generate JWT token
    const payload = {
      admin: {
        id: admin.id,
        role: admin.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Authenticate an admin and get a token
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check the password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      admin: {
        id: admin.id,
        role: admin.role,
      },
    };
    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get admin details
exports.getAdminDetails = async (req, res) => {
  try {
    // Find the admin by ID from JWT token
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update admin details
exports.updateAdminDetails = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    // Find the admin by ID from JWT token
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    // Update the fields
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (role) admin.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
