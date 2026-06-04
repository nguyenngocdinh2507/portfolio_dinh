import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'cv.json');
const port = Number(process.env.PORT || 4000);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error('Request body is too large'));
      }
    });

    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function normalizeCv(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('CV payload must be an object');
  }

  if (!payload.profile || typeof payload.profile !== 'object') {
    throw new Error('CV profile is required');
  }

  if (!Array.isArray(payload.sections)) {
    throw new Error('CV sections must be an array');
  }

  return {
    profile: {
      name: String(payload.profile.name || ''),
      role: String(payload.profile.role || ''),
      email: String(payload.profile.email || ''),
      phone: String(payload.profile.phone || ''),
      location: String(payload.profile.location || ''),
      website: String(payload.profile.website || ''),
      summary: String(payload.profile.summary || ''),
    },
    sections: payload.sections.map((section, sectionIndex) => ({
      id: String(section.id || `section-${sectionIndex + 1}`),
      type: String(section.type || 'custom'),
      title: String(section.title || 'Section'),
      items: Array.isArray(section.items)
        ? section.items.map((item, itemIndex) => ({
            id: String(item.id || `${section.id || 'item'}-${itemIndex + 1}`),
            title: String(item.title || ''),
            subtitle: String(item.subtitle || ''),
            meta: String(item.meta || ''),
            level: String(item.level || ''),
            description: String(item.description || ''),
          }))
        : [],
    })),
  };
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  try {
    if (url.pathname === '/api/health' && request.method === 'GET') {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (url.pathname === '/api/cv' && request.method === 'GET') {
      const file = await readFile(dataPath, 'utf8');
      sendJson(response, 200, JSON.parse(file));
      return;
    }

    if (url.pathname === '/api/cv' && request.method === 'PUT') {
      const body = await readBody(request);
      const cv = normalizeCv(JSON.parse(body || '{}'));
      await writeFile(dataPath, `${JSON.stringify(cv, null, 2)}\n`);
      sendJson(response, 200, cv);
      return;
    }

    sendJson(response, 404, { message: 'Route not found' });
  } catch (error) {
    sendJson(response, 400, { message: error.message || 'Bad request' });
  }
});

server.listen(port, () => {
  console.log(`CV API running at http://localhost:${port}`);
});
