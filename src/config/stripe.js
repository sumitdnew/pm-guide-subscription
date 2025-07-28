// Stripe configuration
// Replace with your actual Stripe keys

export const stripeConfig = {
  // Test keys - replace with your actual keys
  publishableKey: 'pk_test_your_publishable_key_here',
  secretKey: 'sk_test_your_secret_key_here',
  
  // Subscription price ID (create this in your Stripe dashboard)
  priceId: 'price_your_price_id_here',
  
  // Webhook endpoint (for handling subscription events)
  webhookSecret: 'whsec_your_webhook_secret_here'
};

// For development/testing, you can use these test card numbers:
// 4242 4242 4242 4242 - Visa (successful payment)
// 4000 0000 0000 0002 - Visa (declined payment)
// 4000 0025 0000 3155 - Visa (requires authentication) 