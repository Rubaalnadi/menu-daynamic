import { menuData } from './config.js'; // Import menuData from config.js

const proxyUrl = 'http://localhost:3001/proxy';

// Create buttons for each menu item
const menuList = document.getElementById('side-menu'); // Get the <ul> element from the sidebar

menuData.forEach(item => {
  const li = document.createElement('li'); // Create an <li> element for each menu item
  const button = document.createElement('button');
  button.textContent = item.title;

  button.addEventListener('click', async () => {
    const encryptedLink = item.encryptedLink;
    
    try {
      const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(encryptedLink)}`);
      const content = await response.text();  
      const frame = document.getElementById('main-frame');
      const doc = frame.contentDocument || frame.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  });

  li.appendChild(button); // Append button to the <li>
  menuList.appendChild(li); // Append <li> to the <ul> inside the sidebar
});
