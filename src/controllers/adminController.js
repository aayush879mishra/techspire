const Admin = require('../models/adminModel'); // Import the Admin model
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const bcrypt = require('bcryptjs'); // For password hashing and comparison

exports.createAdmin = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Check if admin already exists
      let admin = await Admin.findOne({ email });
      if (admin) {
          return res.status(400).json({ msg: 'Admin already exists' });
      }

      // Create new admin
      admin = new Admin({
          username,
          email,
          password,
      });

      await admin.save();
      res.json({ msg: 'Admin created successfully', admin });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

// Authenticate the admin and get a token
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    // Check the password
     // Debug: log the passwords
     console.log('Entered password:', password);
     console.log('Stored hashed password:', admin.password);

     
    // // const isMatch = await bcrypt.compare(password, admin.password);
    // const isMatch = await admin.matchPassword(password);
    // console.log('Password match:', isMatch); 
    // if (!isMatch) {
    //   return res.status(400).json({ msg: 'Invalid password' });
    // }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch); 
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    // Generate JWT token
    const payload = {
      admin: {
        id: admin.id,
        role: admin.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      msg: "user logged in successfully",
      token: `${token}`,
      admin: admin,
    });
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
    const { username, email, password } = req.body;

    // Find the admin by ID from JWT token
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    // Update the fields
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();

    res.json( { msg: 'Admin details updated successfully',admin } );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




