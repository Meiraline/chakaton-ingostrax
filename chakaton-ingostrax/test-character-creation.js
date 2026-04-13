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

    http.get({ host: '109.174.15.54', port: 22241, path, headers }, (res) => {
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
    }).on('error', reject);
  });
}

(async () => {
  try {
    console.log('\n=== STEP 1: Register user ===');
    const username = 'testchar' + Date.now();
    const password = 'Test123!';
    const regRes = await post('/v1/auth/register', {
      name: 'Тест',
      surname: 'Юзер',
      username,
      password,
    });
    console.log(`Status: ${regRes.status}`);
    console.log(`Response:`, regRes.body);

    if (regRes.status !== 200) {
      console.log('❌ Registration failed');
      return;
    }

    console.log('\n=== STEP 2: Login ===');
    const loginRes = await post('/v1/auth/login', { username, password }, true);
    console.log(`Status: ${loginRes.status}`);
    console.log(`Response:`, loginRes.body);

    if (loginRes.status !== 200) {
      console.log('❌ Login failed');
      return;
    }

    const token = loginRes.body?.access_token || loginRes.body?.token;
    if (!token) {
      console.log('❌ No token in response');
      console.log('Raw response:', loginRes.raw);
      return;
    }
    console.log(`✓ Token obtained: ${token.slice(0, 20)}...`);

    console.log('\n=== STEP 3: Create session (character) ===');
    const createRes = await post('/v1/session_game', { fullName: 'Иван Персонаж' }, false, token);
    console.log(`Status: ${createRes.status}`);
    console.log(`Response:`, createRes.body);

    if (createRes.status !== 200) {
      console.log('❌ Session creation failed');
      console.log('Raw response:', createRes.raw);
      return;
    }

    const sessionId = createRes.body?.id || createRes.body?.sessionGameID;
    if (!sessionId) {
      console.log('❌ No session ID in response');
      console.log('Raw response:', createRes.raw);
      return;
    }
    console.log(`✓ Session ID: ${sessionId}`);

    console.log('\n=== STEP 4: Get background ===');
    const bgRes = await get(`/v1/background/EASY/${sessionId}`, token);
    console.log(`Status: ${bgRes.status}`);
    console.log(`Response:`, bgRes.body);

    if (bgRes.status !== 200) {
      console.log('❌ Background loading failed');
      console.log('Raw response:', bgRes.raw);
      return;
    }

    console.log('\n✓ CHARACTER CREATION COMPLETE');
    console.log('Background:', bgRes.body?.background?.slice(0, 100));
    console.log('Status:', bgRes.body?.status);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
