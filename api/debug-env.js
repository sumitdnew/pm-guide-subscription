export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check environment variables
  const envCheck = {
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
    APP_URL: !!process.env.APP_URL
  };

  // Show partial webhook secret for debugging (first 10 chars)
  const webhookSecretPreview = process.env.STRIPE_WEBHOOK_SECRET 
    ? process.env.STRIPE_WEBHOOK_SECRET.substring(0, 10) + '...'
    : 'NOT_SET';

  return res.status(200).json({
    message: 'Environment variables check',
    environment: process.env.NODE_ENV,
    envCheck,
    webhookSecretPreview,
    timestamp: new Date().toISOString()
  });
} 