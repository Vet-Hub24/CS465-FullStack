const mongoose = require('mongoose');
const User = mongoose.model('users');

const normalizeEmail = (value = '') => value.trim().toLowerCase();

const register = async (req, res) => {
  const name = (req.body.name || '').trim();
  const email = normalizeEmail(req.body.email);
  const password = req.body.password || '';

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  try {
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return res.status(409).json({ message: 'An account with that email already exists.' });
    }

    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();

    return res.status(201).json({ token: user.generateJwt() });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Unable to register the account.' });
  }
};

const login = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password || '';

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email }).exec();

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    return res.status(200).json({ token: user.generateJwt() });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Unable to complete login.' });
  }
};

module.exports = { register, login };
