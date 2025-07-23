const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3300;
const mdDocsPath = path.join(__dirname, 'markdown-files'); // Your markdown folder

// Create markdown-files directory if it doesn't exist
if (!fs.existsSync(mdDocsPath)) {
  fs.mkdirSync(mdDocsPath, { recursive: true });
  
  // Create a sample markdown file for testing
  fs.writeFileSync(
    path.join(mdDocsPath, 'sample.md'), 
    '---\ntitle: Sample Document\ndescription: A sample markdown file for testing\n---\n\n# Sample Document\n\nThis is a sample markdown document for testing the markdown viewer.\n\n## Features\n\n- Markdown rendering\n- Syntax highlighting\n- File tree navigation\n\n```javascript\nconst greeting = "Hello, world!";\nconsole.log(greeting);\n```'
  );
  
  // Create a subdirectory with another markdown file
  const subDirPath = path.join(mdDocsPath, 'subdir');
  if (!fs.existsSync(subDirPath)) {
    fs.mkdirSync(subDirPath);
    fs.writeFileSync(
      path.join(subDirPath, 'another.md'),
      '---\ntitle: Another Document\ndescription: Another markdown file for testing\n---\n\n# Another Document\n\nThis is another sample markdown document in a subdirectory.\n\n## Code Example\n\n```python\ndef hello():\n    print("Hello, world!")\n\nhello()\n```'
    );
  }
}

// Helper function to get folder structure
function getFolderStructure(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const result = [];

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const itemRelativePath = path.join(relativePath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      result.push({
        name: item,
        path: itemRelativePath.replace(/\\/g, '/'),
        type: 'directory',
        children: getFolderStructure(itemPath, itemRelativePath)
      });
    } else if (stats.isFile() && path.extname(item) === '.md') {
      result.push({
        name: item,
        path: itemRelativePath.replace(/\\/g, '/'),
        type: 'file'
      });
    }
  }

  return result;
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // API endpoints
  if (url.pathname === '/api/files') {
    // Return folder structure
    try {
      const folderStructure = getFolderStructure(mdDocsPath);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(folderStructure));
    } catch (error) {
      console.error('Error getting folder structure:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read folder structure' }));
    }
  } else if (url.pathname.startsWith('/api/content/')) {
    // Serve markdown file content
    try {
      const filePath = path.join(mdDocsPath, url.pathname.replace('/api/content/', ''));
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(content);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found' }));
      }
    } catch (error) {
      console.error('Error reading file:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read file' }));
    }
  } else {
    // Not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`API endpoints:`);
  console.log(`- GET /api/files - Get file tree structure`);
  console.log(`- GET /api/content/:path - Get file content`);
});
