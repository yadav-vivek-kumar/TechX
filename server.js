import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const csv = path.join(process.env.ANALYTICS_DIR || path.join(root, 'analytics'), 'techx-analytics.csv');
fs.mkdirSync(path.dirname(csv), { recursive: true });
if (!fs.existsSync(csv)) fs.writeFileSync(csv, 'timestamp,session_id,visitor_id,session_duration_seconds,pages_visited,max_scroll_percent,purchased,returning_visitor\n');
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/analytics') {
    let raw = '';
    req.on('data', chunk => raw += chunk);
    req.on('end', () => {
      let x = {}; try { x = JSON.parse(raw); } catch { res.writeHead(400); return res.end('Invalid JSON'); }
  const safe = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
  const row = [x.timestamp, x.sessionId, x.visitorId, Number(x.duration || 0), Number(x.pages || 1), Number(x.scroll || 0), Boolean(x.purchased), Boolean(x.returning)].map(safe).join(',') + '\n';
  fs.appendFileSync(csv, row);
      res.writeHead(201, { 'Content-Type': 'application/json' }); res.end('{"saved":true}');
    }); return;
  }
  const requested = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const candidate = path.join(root, requested);
  const allowed = candidate.startsWith(root) && fs.existsSync(candidate) && fs.statSync(candidate).isFile();
  const target = allowed ? candidate : path.join(root, 'index.html');
  const types = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.csv':'text/csv' };
  res.writeHead(200, { 'Content-Type': `${types[path.extname(target)] || 'application/octet-stream'}; charset=utf-8` });
  fs.createReadStream(target).pipe(res);
});
server.listen(process.env.PORT || 3000, () => console.log('TechX is live at http://localhost:3000'));
