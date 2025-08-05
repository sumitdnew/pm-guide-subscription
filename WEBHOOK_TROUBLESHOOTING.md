# Stripe Webhook Troubleshooting Guide

## Issue: "Webhook signature verification failed: No signatures found matching the expected signature for payload"

This error occurs when Stripe's webhook signature verification fails. Here's how to fix it:

## ✅ Fixed Issues

### 1. Raw Body Access (FIXED)
**Problem**: `express.json()` middleware was parsing the request body before webhook verification.

**Solution**: 
- Moved webhook endpoint before `express.json()` middleware
- Added raw body extraction code
- Now using raw body for signature verification

### 2. Customer Email Extraction (FIXED)
**Problem**: Code was looking for `session.customer_email` but email was in `session.customer_details.email`.

**Solution**: Updated code to check multiple locations for customer email:
```javascript
let customerEmail = session.customer_email;
if (!customerEmail && session.customer_details && session.customer_details.email) {
  customerEmail = session.customer_details.email;
}
```

## 🔧 Environment Variables Check

Make sure these environment variables are set correctly:

```bash
# Required for webhook verification
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional for email functionality
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

## 🧪 Testing Your Webhook

### 1. Test with Stripe CLI
```bash
# Install Stripe CLI if not already installed
# https://stripe.com/docs/stripe-cli

# Forward webhooks to your local server
stripe listen --forward-to localhost:3001/webhook

# In another terminal, trigger a test webhook
stripe trigger checkout.session.completed
```

### 2. Test with the test script
```bash
# Run the test webhook server
node test-webhook.js

# In another terminal, forward webhooks to test endpoint
stripe listen --forward-to localhost:3002/test-webhook
```

## 🔍 Debugging Steps

### 1. Check Environment Variables
```bash
# Verify your environment variables are loaded
node -e "console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10))"
```

### 2. Check Webhook Secret
- Go to Stripe Dashboard → Webhooks
- Find your webhook endpoint
- Click "Reveal" next to the signing secret
- Copy the `whsec_...` value
- Update your `STRIPE_WEBHOOK_SECRET` environment variable

### 3. Verify Webhook URL
- Make sure your webhook URL is correct in Stripe Dashboard
- For local testing: `http://localhost:3001/webhook`
- For production: `https://yourdomain.com/webhook`

### 4. Check Request Headers
The webhook request must include the `stripe-signature` header. If you're using a proxy or load balancer, ensure it forwards this header.

## 🚨 Common Issues

### 1. Wrong Webhook Secret
- Make sure you're using the correct webhook secret for your environment (test vs live)
- Each webhook endpoint has its own secret

### 2. Body Modification
- Ensure no middleware modifies the request body before webhook verification
- The body must be exactly as Stripe sent it

### 3. Character Encoding
- Ensure the raw body is converted to UTF-8 string correctly
- Don't modify line endings or formatting

### 4. Proxy Issues
- If using a proxy (nginx, Cloudflare, etc.), ensure it doesn't modify the request
- Forward all headers, especially `stripe-signature`

## 📝 Current Implementation

The fixed webhook handler now:
1. ✅ Gets raw body before any middleware processes it
2. ✅ Uses raw body for signature verification
3. ✅ Extracts customer email from correct location
4. ✅ Checks payment status before processing
5. ✅ Includes comprehensive error logging

## 🎯 Next Steps

1. **Test locally** with Stripe CLI
2. **Verify environment variables** are set correctly
3. **Check webhook logs** for detailed error messages
4. **Deploy to production** once local testing works

## 📞 Still Having Issues?

If you're still experiencing problems:
1. Check the server logs for detailed error messages
2. Verify your webhook secret in Stripe Dashboard
3. Test with the provided test script
4. Ensure no proxy is modifying the request 