// Debug test to check webhook environment and get detailed error info
const https = require('https');

const VERCEL_DOMAIN = 'pm-guide-subscription.vercel.app';

console.log('=== VERCEL WEBHOOK DEBUG TEST ===');

// Test 1: Check if endpoint exists and get environment info
const options1 = {
  hostname: VERCEL_DOMAIN,
  port: 443,
  path: '/api/webhook',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req1 = https.request(options1, (res) => {
  console.log(`\n=== ENDPOINT CHECK ===`);
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${data}`);
    
    // Now test with a minimal payload to see the exact error
    testWithMinimalPayload();
  });
});

req1.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req1.end();

function testWithMinimalPayload() {
  console.log('\n=== TESTING WITH MINIMAL PAYLOAD ===');
  
  const crypto = require('crypto');
  
  // Test with both test and live secrets
  const testSecrets = [
    'whsec_test_secret_for_testing',
    'whsec_Up4upP5y49cPwXOJ1o2UwoJhU88ZWyg4'
  ];
  
  const minimalPayload = `{"id":"evt_test","object":"event","type":"checkout.session.completed"}`;
  
  testSecrets.forEach((secret, index) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signedPayload = `${timestamp}.${minimalPayload}`;
    const signature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');
    
    const stripeSignature = `t=${timestamp},v1=${signature}`;
    
    console.log(`\n--- Test ${index + 1}: ${secret.substring(0, 10)}... ---`);
    
    const options = {
      hostname: VERCEL_DOMAIN,
      port: 443,
      path: '/api/webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': stripeSignature,
        'Content-Length': Buffer.byteLength(minimalPayload)
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Response: ${data}`);
        
        if (res.statusCode === 200) {
          console.log('✅ SUCCESS with this secret!');
        } else {
          console.log('❌ Failed with this secret');
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`Request error: ${e.message}`);
    });
    
    req.write(minimalPayload);
    req.end();
  });
} 