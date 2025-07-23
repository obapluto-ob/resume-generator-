const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password required.' });
  }
  try {
    const exists = await User.findOne({ $or: [{ name: username }, { email }] });
    if (exists) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }
    const user = new User({
      name: username,
      email,
      password, // Hash in production!
      avatarUrl: '',
      bio: 'Resume builder enthusiast.',
      joined: new Date().toISOString()
    });
    await user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ name: username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Migration route: old user sets a username
router.post('/migrate', async (req, res) => {
  const { email, password, newUsername } = req.body;
  if (!email || !password || !newUsername) {
    return res.status(400).json({ message: 'Email, password, and new username required.' });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const exists = await User.findOne({ name: newUsername });
    if (exists) {
      return res.status(400).json({ message: 'Username already exists.' });
    }
    user.name = newUsername;
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;