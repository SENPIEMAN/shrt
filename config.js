/**
 * Configuration for the shrt URL shortener
 * Modify these settings to customize the application
 */
module.exports = {
  // Your custom domain for shortened URLs (without protocol)
  // Example: 'short.yourdomain.com'
  domain: 'yourdomain.com',
  
  // Use HTTPS for shortened URLs (true/false)
  useHttps: true,
  
  // Server port
  port: process.env.PORT || 3000,
  
  // Length of the generated short IDs
  idLength: 6
};
