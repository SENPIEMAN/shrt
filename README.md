# shrt - URL Shortener

A simple, elegant URL shortener application built with Node.js and Express that can use your custom domain for shortened links.

## Features

- Shorten long URLs into compact, easy-to-share links with your custom domain
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

3. Configure your custom domain:
   
   Edit the `config.js` file to set your custom domain:
   ```javascript
   module.exports = {
     domain: 'your-domain.com',  // Your custom domain
     useHttps: true,             // Use HTTPS for shortened URLs
     port: 3000,                 // Server port
     idLength: 6                 // Length of generated short IDs
   };
   ```

4. Start the server:
   ```
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Domain Setup

To use your custom domain with this URL shortener:

1. Configure your DNS settings to point your domain to the server where this application is hosted
2. Update the `domain` field in `config.js` to your domain
3. If you're using HTTPS (recommended), set `useHttps` to `true` in `config.js`
4. Ensure your server has the appropriate SSL certificates if using HTTPS

## Usage

1. Enter a long URL in the input field
2. Click "Shorten" or press Enter
3. Copy the shortened URL with the copy button
4. Share the shortened URL with others

When someone visits the shortened URL, they will be automatically redirected to the original URL.

## API Endpoints

- `POST /api/shorten` - Create a new shortened URL
  - Request body: `{ "url": "https://example.com/very/long/url" }`
  - Response: `{ "shortUrl": "https://your-domain.com/abc123", "shortId": "abc123" }`

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
├── config.js           # Configuration file
├── package.json        # Project configuration
└── README.md           # This file
```

## License

ISC
