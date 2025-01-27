const express = require('express');
const crypto = require('crypto-js');
const axios = require('axios');
const app = express();
const port = 3001;

// Secret encryption key (should match the one used on the client-side)
const ENCRYPTION_KEY = 'your-encryption-key';

// Decrypt function
function decryptUrl(encryptedUrl) {
  // Decode the base64 encoded URL
  const decodedBase64 = crypto.enc.Base64.parse(encryptedUrl).toString(crypto.enc.Utf8);

  // Extract IV (first 24 characters, as it is Base64 encoded 16 bytes)
  const ivBase64 = decodedBase64.slice(0, 24); // Extract IV (Base64)
  const encrypted = decodedBase64.slice(24);   // The remaining part is the encrypted URL
  
  // Convert IV from Base64 to WordArray
  const iv = crypto.enc.Base64.parse(ivBase64);

  // Decrypt the URL
  const decryptedBytes = crypto.AES.decrypt(encrypted, ENCRYPTION_KEY, { iv: iv });
  const decryptedUrl = decryptedBytes.toString(crypto.enc.Utf8);
  
  return decryptedUrl;
}
const cors = require('cors');
app.use(cors());  // Enable CORS for all routes
// Proxy endpoint
app.get('/proxy', async (req, res) => {
  try {
    const encryptedUrl = req.query.url;  // Get encrypted URL from query string
    const decryptedUrl = decryptUrl(encryptedUrl);  // Decrypt URL

    // Fetch content from the decrypted URL
    const response = await axios.get(decryptedUrl);
    
    res.send(response.data);  // Send the content back to the client
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching the content.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
