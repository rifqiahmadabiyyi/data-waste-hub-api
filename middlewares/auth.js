const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Secret key yang kamu gunakan untuk sign token
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware untuk memverifikasi token JWT
exports.authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user; // Menyimpan user ke request object
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};