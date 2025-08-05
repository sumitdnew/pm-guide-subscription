// Test to check environment variables in Vercel
const https = require('https');

const VERCEL_DOMAIN = 'pm-guide-subscription.vercel.app';

console.log('=== VERCEL ENVIRONMENT TEST ===');

// Test the existing test-webhook-secret endpoint
const options = {
  hostname: VERCEL_DOMAIN,
  port: 443,
  path: '/api/test-webhook-secret',
  method: 'POST', // Changed to POST since the endpoint expects POST
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log(`\n=== ENVIRONMENT CHECK ===`);
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${data}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Environment variables are accessible');
    } else if (res.statusCode === 405) {
      console.log('✅ Endpoint exists but needs POST method');
    } else if (res.statusCode === 404) {
      console.log('❌ Test endpoint not found');
    } else {
      console.log(`Status ${res.statusCode}: Check response for details`);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

// Send a minimal payload
const payload = '{"test":"data"}';
req.write(payload);
req.end();

console.log('\n=== SENDING REQUEST ===');
console.log(`URL: https://${VERCEL_DOMAIN}/api/test-webhook-secret`);
console.log(`Method: POST`); 