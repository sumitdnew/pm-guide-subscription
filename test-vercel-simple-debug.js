// Simple debug test to see what's happening with the webhook
const https = require('https');

const VERCEL_DOMAIN = 'pm-guide-subscription.vercel.app';

console.log('=== SIMPLE WEBHOOK DEBUG ===');

// Test 1: Send a request without signature to see the error
const options1 = {
  hostname: VERCEL_DOMAIN,
  port: 443,
  path: '/api/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const payload1 = '{"test":"data"}';

const req1 = https.request(options1, (res) => {
  console.log(`\n=== TEST 1: No Signature ===`);
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${data}`);
    
    // Test 2: Send with signature but wrong secret
    testWithWrongSecret();
  });
});

req1.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req1.write(payload1);
req1.end();

function testWithWrongSecret() {
  console.log('\n=== TEST 2: Wrong Secret ===');
  
  const crypto = require('crypto');
  
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload1}`;
  const signature = crypto
    .createHmac('sha256', 'whsec_wrong_secret')
    .update(signedPayload, 'utf8')
    .digest('hex');
  
  const stripeSignature = `t=${timestamp},v1=${signature}`;
  
  const options2 = {
    hostname: VERCEL_DOMAIN,
    port: 443,
    path: '/api/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': stripeSignature
    }
  };
  
  const req2 = https.request(options2, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Response: ${data}`);
      
      // Test 3: Send with correct secret
      testWithCorrectSecret();
    });
  });
  
  req2.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
  });
  
  req2.write(payload1);
  req2.end();
}

function testWithCorrectSecret() {
  console.log('\n=== TEST 3: Correct Secret ===');
  
  const crypto = require('crypto');
  
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload1}`;
  const signature = crypto
    .createHmac('sha256', 'whsec_Up4upP5y49cPwXOJ1o2UwoJhU88ZWyg4')
    .update(signedPayload, 'utf8')
    .digest('hex');
  
  const stripeSignature = `t=${timestamp},v1=${signature}`;
  
  const options3 = {
    hostname: VERCEL_DOMAIN,
    port: 443,
    path: '/api/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': stripeSignature
    }
  };
  
  const req3 = https.request(options3, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Response: ${data}`);
      console.log('\n=== ANALYSIS ===');
      
      if (res.statusCode === 200) {
        console.log('✅ Webhook is working correctly!');
      } else if (res.statusCode === 400) {
        console.log('❌ Signature verification is failing');
        console.log('This could mean:');
        console.log('1. Environment variable STRIPE_WEBHOOK_SECRET is not set in Vercel');
        console.log('2. The secret value is different from what we\'re using');
        console.log('3. There\'s an issue with the webhook implementation');
      } else {
        console.log(`Status ${res.statusCode}: Unexpected response`);
      }
    });
  });
  
  req3.on('error', (e) => {
    console.error(`Request error: ${e.message}`);
  });
  
  req3.write(payload1);
  req3.end();
}

console.log('\n=== SENDING REQUESTS ===');
console.log(`URL: https://${VERCEL_DOMAIN}/api/webhook`); 