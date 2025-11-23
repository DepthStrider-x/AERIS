const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');

// Import our backend modules
const auth = require('./backend/auth');
const users = require('./backend/users');
const preferences = require('./backend/preferences');
const locations = require('./backend/locations');

const PORT = 8000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown'
};

// Simple session storage (in production, use a proper session store)
const sessions = {};

// Parse POST body
function parseBody(body) {
  const obj = {};
  body.split('&').forEach(part => {
    const [key, val] = part.split('=');
    obj[decodeURIComponent(key)] = decodeURIComponent(val.replace(/\+/g, ' '));
  });
  return obj;
}

// Get user from request
function getUserFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = auth.verifyToken(token);
    return decoded;
  } catch (err) {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  console.log(`Request received: ${req.url}`);
  
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle API routes
  if (pathname.startsWith('/api/')) {
    try {
      // CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }
      
      // Authentication routes
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const { email, password } = parseBody(body);
            const result = await auth.authenticateUser(email, password);
            sessions[result.token] = result.user;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      
      if (pathname === '/api/auth/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const { name, email, password } = parseBody(body);
            const user = await auth.registerUser(name, email, password);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
          } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      
      if (pathname === '/api/auth/logout' && req.method === 'POST') {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          delete sessions[token];
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Logged out successfully' }));
        return;
      }
      
      // Check authentication for protected routes
      const user = getUserFromRequest(req);
      if (!user) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      
      // User routes
      if (pathname === '/api/user' && req.method === 'GET') {
        const userData = await users.getUserById(user.userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userData));
        return;
      }
      
      // Preferences routes
      if (pathname === '/api/preferences' && req.method === 'GET') {
        const prefs = await preferences.getUserPreferences(user.userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(prefs));
        return;
      }
      
      if (pathname === '/api/preferences' && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const prefs = parseBody(body);
            const result = await preferences.updateUserPreferences(user.userId, prefs);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      
      // Locations routes
      if (pathname === '/api/locations' && req.method === 'GET') {
        const savedLocations = await locations.getSavedLocations(user.userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(savedLocations));
        return;
      }
      
      if (pathname === '/api/locations' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const { location_name } = parseBody(body);
            const result = await locations.saveLocation(user.userId, location_name);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      
      if (pathname.startsWith('/api/locations/') && req.method === 'DELETE') {
        const locationId = pathname.split('/')[3];
        const result = await locations.removeLocation(user.userId, locationId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        return;
      }
      
      // Check if location is saved
      if (pathname.startsWith('/api/location-check/') && req.method === 'GET') {
        const locationName = decodeURIComponent(pathname.split('/')[3]);
        const isSaved = await locations.isLocationSaved(user.userId, locationName);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ saved: isSaved }));
        return;
      }
      
      // If no route matched
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
      return;
    } catch (err) {
      console.error('API Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
      return;
    }
  }
  
  // Serve static files
  let filePath = '.' + pathname;
  
  // Serve index.html by default
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Resolve the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        fs.readFile('./404.html', (err, content404) => {
          if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content404, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});