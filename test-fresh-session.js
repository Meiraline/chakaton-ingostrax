const http = require('http');
const querystring = require('querystring');

const BASE = 'http://109.174.15.54:22241';

function post(path, data, isForm = false, token = null) {
  return new Promise((resolve, reject) => {
    const body = isForm ? querystring.stringify(data) : JSON.stringify(data);
    const headers = {
      'Content-Type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
      'Content-Length': Buffer.byteLength(body),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const req = http.request(BASE + path, { method: 'POST', headers }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try {
          const parsed = d ? JSON.parse(d) : {};
          resolve({ status: res.statusCode, body: parsed, raw: d });
        } catch (e) {
          resolve({ status: res.statusCode, body: null, raw: d });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function get(path, token) {
  return new Promise((resolve, reject) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const req = http.request(BASE + path, { method: 'GET', headers }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try {
          const parsed = d ? JSON.parse(d) : {};
          resolve({ status: res.statusCode, body: parsed, raw: d });
        } catch (e) {
          resolve({ status: res.statusCode, body: null, raw: d });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  try {
    console.log('\n=== Creating fresh session ===');
    const username = 'freshtest' + Date.now();
    const password = 'Test123!';

    // Register
    await post('/v1/auth/register', {
      name: 'Fresh',
      surname: 'Test',
      username,
      password,
    });

    // Login
    const loginRes = await post('/v1/auth/login', { username, password }, true);
    const token = loginRes.body?.access_token;
    console.log(`Token: ${token?.slice(0, 20)}...`);

    // Create session
    const sessionRes = await post('/v1/session_game', { fullName: 'Иван' }, false, token);
    const sessionId = sessionRes.body?.id;
    console.log(`Session ID: ${sessionId}`);

    // Try to get background immediately
    console.log('\n=== Test 1: GET /v1/background/EASY/{sessionId} ===');
    const start1 = Date.now();
    const bgRes = await get(`/v1/background/EASY/${sessionId}`, token);
    console.log(`Status: ${bgRes.status}, Time: ${Date.now() - start1}ms`);
    if (bgRes.status !== 200) {
      console.log('Raw:', bgRes.raw);
    } else {
      console.log('Background:', bgRes.body?.background?.slice(0, 100));
      console.log('Status:', bgRes.body?.status);
    }

    // Try to get round immediately
    console.log('\n=== Test 2: GET /v1/round/{sessionId} ===');
    const start2 = Date.now();
    const roundRes = await get(`/v1/round/${sessionId}`, token);
    console.log(`Status: ${roundRes.status}, Time: ${Date.now() - start2}ms`);
    if (roundRes.status !== 200) {
      console.log('Raw:', roundRes.raw);
    } else {
      console.log('Event:', roundRes.body?.event);
      console.log('Status:', roundRes.body?.status);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
