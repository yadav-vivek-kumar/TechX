import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

// Analytics CSV local storage path
const csvPath = path.join(process.env.ANALYTICS_DIR || path.join(__dirname, 'analytics'), 'techx-analytics.csv');
fs.mkdirSync(path.dirname(csvPath), { recursive: true });

if (!fs.existsSync(csvPath)) {
  fs.writeFileSync(
    csvPath,
    'timestamp,session_id,visitor_id,session_duration_seconds,pages_visited,max_scroll_percent,purchased,returning_visitor\n'
  );
}

// MIME types for modern web assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.csv': 'text/csv; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Local Analytics Endpoint
  if (req.method === 'POST' && req.url === '/api/analytics') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      let data = {};
      try {
        data = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }

      const safe = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
      const row = [
        data.timestamp,
        data.sessionId,
        data.visitorId,
        Number(data.duration || 0),
        Number(data.pages || 1),
        Number(data.scroll || 0),
        Boolean(data.purchased),
        Boolean(data.returning)
      ]
        .map(safe)
        .join(',') + '\n';

      fs.appendFileSync(csvPath, row);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ saved: true }));
    });
    return;
  }

  // Static File Serving with SPA fallback
  const parsedUrl = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const candidatePath = path.join(__dirname, parsedUrl);

  const isSafePath = candidatePath.startsWith(__dirname);
  const fileExists = isSafePath && fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile();
  const targetFile = fileExists ? candidatePath : path.join(__dirname, 'index.html');

  const ext = path.extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(targetFile).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n⚡ TechX 2.0 Local Development Server is live!`);
  console.log(`👉 Local:   http://localhost:${PORT}`);
  console.log(`📊 Storage: ${csvPath}\n`);
});
