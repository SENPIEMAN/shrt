# shrt - URL Shortener

A simple, elegant URL shortener application built with Node.js and Express.

## Features

- Shorten long URLs into compact, easy-to-share links
- Copy shortened URLs to clipboard with a single click
- Clean, responsive user interface
- Fast and reliable redirection
- Simple JSON-based storage

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Storage**: JSON file-based database
- **ID Generation**: nanoid

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shrt.git
   cd shrt
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a long URL in the input field
2. Click "Shorten" or press Enter
3. Copy the shortened URL with the copy button
4. Share the shortened URL with others

When someone visits the shortened URL, they will be automatically redirected to the original URL.

## API Endpoints

- `POST /api/shorten` - Create a new shortened URL
  - Request body: `{ "url": "https://example.com/very/long/url" }`
  - Response: `{ "shortUrl": "http://localhost:3000/abc123", "shortId": "abc123" }`

- `GET /:shortId` - Redirect to the original URL

- `GET /api/urls` - Get all URLs (for admin/stats purposes)

## Project Structure

```
shrt/
├── data/
│   └── urls.json       # URL database
├── public/
│   ├── index.html      # Frontend HTML
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server
├── package.json        # Project configuration
└── README.md           # This file
```

## License

ISC
