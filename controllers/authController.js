const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret_key_anda'; // ganti dengan secret kuat

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [existing] = await User.findByUsername(username);
    if (existing.length > 0) return res.status(400).json({ message: 'Username already exists' });

    await User.create(username, password);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await User.findByUsername(username);
    if (rows.length === 0) return res.status(400).json({ message: 'Invalid username or password' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    // sertakan level di payload JWT dan response
    const token = jwt.sign(
      { id: user.id, username: user.username, level: user.level }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login successful', 
      token, 
      user: {
        id: user.id,
        username: user.username,
        level: user.level
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
