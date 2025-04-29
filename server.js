const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database path
const DB_PATH = path.join(__dirname, 'data', 'urls.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({}));
}

// Helper function to read the database
function readUrlDatabase() {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to the database
function writeUrlDatabase(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// API endpoint to create a short URL
app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  // Validate URL format
  try {
    new URL(url);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
  
  // Generate a short ID (6 characters)
  const shortId = nanoid(6);
  
  // Save to database
  const urlDatabase = readUrlDatabase();
  urlDatabase[shortId] = {
    originalUrl: url,
    createdAt: new Date().toISOString()
  };
  writeUrlDatabase(urlDatabase);
  
  // Return the shortened URL
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;
  res.json({ shortUrl, shortId });
});

// API endpoint to get all URLs (for admin/stats purposes)
app.get('/api/urls', (req, res) => {
  const urlDatabase = readUrlDatabase();
  res.json(urlDatabase);
});

// Redirect endpoint
app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const urlDatabase = readUrlDatabase();
  
  if (urlDatabase[shortId]) {
    return res.redirect(urlDatabase[shortId].originalUrl);
  }
  
  // If short ID not found, redirect to home page
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
