const express = require('express');
const router = express.Router();
const UserSettings = require('../models/UserSettings');
const User = require('../models/User');
const Resume = require('../models/Resume');

// Save/update settings
router.post('/settings', async (req, res) => {
  const { email, ...settings } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const updated = await UserSettings.findOneAndUpdate(
      { email },
      { $set: settings },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Settings updated!', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get settings
router.get('/settings', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const settings = await UserSettings.findOne({ email });
    if (!settings) return res.status(404).json({ error: 'Settings not found.' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get real stats
router.get('/stats', async (req, res) => {
  try {
    const resumesCreated = await Resume.countDocuments();
    const activeUsers = await User.countDocuments();
    // Add more stats as needed
    res.json({
      resumesCreated,
      activeUsers,
      successRate: 98, // Replace with real calculation if needed
      companiesHiring: 0 // Replace with real data if you have it
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;