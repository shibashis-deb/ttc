const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Simple auth route (for testing)
app.post('/api/auth/login', (req, res) => {
  // This is just for testing, in a real app you would validate credentials
  const token = jwt.sign({ id: 1, username: 'testuser' }, 'your_jwt_secret', {
    expiresIn: '1h'
  });
  
  res.json({ token });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
