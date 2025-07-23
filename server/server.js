const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

mongoose.connect('mongodb+srv://michealbyers750:gmUVRNfZQsTV7GZY@resumeclustertr.rtrjq9m.mongodb.net/resumeDM?retryWrites=true&w=majority', {
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  avatarUrl: { type: String }
});

const User = mongoose.model('User', userSchema);

// Add UserSettings model
const UserSettings = require('./models/UserSettings');

// Import and use the user routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const statsRouter = require('./routes/stats');
app.use('/api/stats', statsRouter);

app.post('/api/resumes', (req, res) => {
  const resumeData = req.body;
  res.status(201).json({ message: 'Resume created', data: resumeData });
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        { name: username, password },
        { email, password }
      ]
    });
    if (user) {
      res.json({ message: "Login successful", user: { email: user.email, name: user.name } });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const exists = await User.findOne({ $or: [{ email }, { name: username }] });
    if (exists) {
      return res.status(400).json({ message: "Email or username already exists" });
    }
    const user = new User({ name: username, email, password });
    await user.save();

    // Create default user settings
    await UserSettings.create({ email });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Example in-memory user store (replace with your DB logic)
let user = {
  name: '',
  email: '',
  bio: '',
  avatarUrl: ''
};

app.post('/api/user/update', async (req, res) => {
  const { email, name, bio, avatarUrl } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and Email are required.' });
  }
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, bio, avatarUrl },
      { new: true }
    );
    return res.json({ success: true, message: 'Profile updated successfully!', user });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
});

// You can add /api/user/delete similarly
app.post('/api/user/delete', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  try {
    await User.deleteOne({ email });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));