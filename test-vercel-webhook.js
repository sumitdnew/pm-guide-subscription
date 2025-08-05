// Test script to send webhook to Vercel deployment
const crypto = require('crypto');
const fs = require('fs');

// Replace with your actual Vercel domain
const VERCEL_DOMAIN = 'your-app-name.vercel.app'; // Replace with your actual domain
const WEBHOOK_SECRET = 'whsec_your_webhook_secret_here'; // Replace with your actual webhook secret

// Load the test payload
const payload = fs.readFileSync('test-webhook.json', 'utf8');

// Create the signature
const timestamp = Math.floor(Date.now() / 1000);
const signedPayload = `${timestamp}.${payload}`;
const signature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(signedPayload, 'utf8')
  .digest('hex');

const stripeSignature = `t=${timestamp},v1=${signature}`;

console.log('=== VERCEL WEBHOOK TEST ===');
console.log('Target URL:', `https://${VERCEL_DOMAIN}/api/webhook`);
console.log('Webhook Secret:', WEBHOOK_SECRET.substring(0, 10) + '...');
console.log('Timestamp:', timestamp);
console.log('Signature:', stripeSignature);
console.log('Payload length:', payload.length);

// Test the webhook endpoint
const https = require('https');

const postData = payload;

const options = {
  hostname: VERCEL_DOMAIN,
  port: 443,
  path: '/api/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Stripe-Signature': stripeSignature,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`\n=== RESPONSE ===`);
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response Body: ${data}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Webhook test successful!');
    } else {
      console.log('❌ Webhook test failed');
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.write(postData);
req.end();

console.log('\n=== SENDING WEBHOOK REQUEST ===');
console.log(`URL: https://${VERCEL_DOMAIN}/api/webhook`);
console.log(`Method: POST`);
console.log(`Headers:`, options.headers); 