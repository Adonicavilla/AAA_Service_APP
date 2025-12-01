require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { testConnection } = require('./database/config');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// DB test endpoint (useful during development)
app.get('/api/dbtest', async (req, res) => {
  try {
    await testConnection();
    res.json({ db: 'connected' });
  } catch (err) {
    res.status(500).json({ db: 'error', message: err.message });
  }
});

// Serve static client (root contains static HTML/CSS/JS)
app.use(express.static(path.join(__dirname)));

// Fallback for client-side routing
app.get('*', (req, res) => {
  const index = path.join(__dirname, 'index.html');
  res.sendFile(index);
});

const port = process.env.PORT || process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

module.exports = app;
