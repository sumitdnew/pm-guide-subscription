const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Test webhook endpoint
app.post('/test-webhook', async (req, res) => {
  console.log('=== WEBHOOK TEST ===');
  console.log('Environment variables:');
  console.log('- STRIPE_SECRET_KEY configured:', !!process.env.STRIPE_SECRET_KEY);
  console.log('- STRIPE_WEBHOOK_SECRET configured:', !!process.env.STRIPE_WEBHOOK_SECRET);
  console.log('- STRIPE_WEBHOOK_SECRET starts with:', process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10));
  
  const sig = req.headers['stripe-signature'];
  console.log('- Stripe signature header:', !!sig);
  console.log('- Stripe signature starts with:', sig?.substring(0, 20));

  try {
    // Get raw body
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    await new Promise((resolve, reject) => {
      req.on('end', resolve);
      req.on('error', reject);
    });
    const rawBody = Buffer.concat(chunks).toString('utf8');
    
    console.log('- Raw body length:', rawBody.length);
    console.log('- Raw body starts with:', rawBody.substring(0, 100));
    
    const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Webhook signature verification SUCCESS!');
    console.log('- Event type:', event.type);
    
    res.json({ 
      success: true, 
      message: 'Webhook signature verification successful',
      eventType: event.type 
    });
  } catch (err) {
    console.error('❌ Webhook signature verification FAILED:', err.message);
    console.error('Error details:', err);
    
    res.status(400).json({ 
      error: 'Webhook signature verification failed',
      details: err.message,
      debug: {
        secretConfigured: !!process.env.STRIPE_WEBHOOK_SECRET,
        secretStartsWith: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10),
        signatureHeader: !!sig,
        signatureStartsWith: sig?.substring(0, 20)
      }
    });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🧪 Test webhook server running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/test-webhook`);
});

module.exports = app; 