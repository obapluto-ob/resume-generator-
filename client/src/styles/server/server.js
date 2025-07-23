const express = require('express');
const app = express();

app.use(express.json()); // <-- Required for req.body

app.get('/api/stats', (req, res) => {
  res.json({
    resumesCreated: 34000,
    activeUsers: 12000,
    successRate: 98,
    companiesHiring: 500
  });
});

app.post('/api/resumes', (req, res) => {
  const resumeData = req.body;
  res.status(201).json({ message: 'Resume created', data: resumeData });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));