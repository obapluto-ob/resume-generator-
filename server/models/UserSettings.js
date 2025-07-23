const mongoose = require('mongoose');

const UserSettingsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  theme: { type: String, default: 'light' },
  isPrivate: { type: Boolean, default: false },
  language: { type: String, default: 'English' },
  resumeTemplate: { type: String, default: 'Academic&ResearchTemplate' },
});

module.exports = mongoose.model('UserSettings', UserSettingsSchema);