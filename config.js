const ENCRYPTION_KEY = 'your-encryption-key';

// Encrypt URL function
function encryptUrl(url) {
  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  const encrypted = CryptoJS.AES.encrypt(url, ENCRYPTION_KEY, { iv: iv }).toString();
  
  // Combine IV and encrypted URL, then base64 encode the entire string
  const ivBase64 = iv.toString(CryptoJS.enc.Base64);  // Base64 encode IV
  const encryptedUrl = ivBase64 + encrypted;         // Combine IV and encrypted URL

  // Return base64 encoded string
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedUrl));
}

// Sample menu data with encrypted links
const menuData = [
  { title: 'Google', encryptedLink: encryptUrl('https://www.google.com') },
  { title: 'Wikipedia', encryptedLink: encryptUrl('https://www.wikipedia.org') },
  { title: 'GitHub', encryptedLink: encryptUrl('https://github.com') },
  { title: 'Stack Overflow', encryptedLink: encryptUrl('https://stackoverflow.com') },
];

export { menuData }; // Export the menuData to use in other files
