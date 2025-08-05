// Test with exact payload from user's webhook
const crypto = require('crypto');
const https = require('https');

const VERCEL_DOMAIN = 'pm-guide-subscription.vercel.app';
const WEBHOOK_SECRET = 'whsec_Up4upP5y49cPwXOJ1o2UwoJhU88ZWyg4';

// Exact payload from user's original webhook (no trailing spaces)
const payload = `{
  "id": "evt_1RscuCQ0mQabLsGQ0PPDY9eu",
  "object": "event",
  "api_version": "2025-06-30.basil",
  "created": 1754369720,
  "data": {
    "object": {
      "id": "cs_live_a1WdnVLn2vRrNq0HYxRCaXDzkHLVntVoJURwOzuIEJx9puIOpHokIYFn2Y",
      "object": "checkout.session",
      "adaptive_pricing": {
        "enabled": true
      },
      "after_expiration": null,
      "allow_promotion_codes": false,
      "amount_subtotal": 99,
      "amount_total": 99,
      "automatic_tax": {
        "enabled": true,
        "liability": {
          "type": "self"
        },
        "provider": "stripe",
        "status": "complete"
      },
      "billing_address_collection": "auto",
      "cancel_url": "https://stripe.com",
      "client_reference_id": null,
      "client_secret": null,
      "collected_information": null,
      "consent": null,
      "consent_collection": {
        "payment_method_reuse_agreement": null,
        "promotions": "none",
        "terms_of_service": "none"
      },
      "created": 1754369655,
      "currency": "usd",
      "currency_conversion": null,
      "custom_fields": [],
      "custom_text": {
        "after_submit": null,
        "shipping_address": null,
        "submit": null,
        "terms_of_service_acceptance": null
      },
      "customer": null,
      "customer_creation": "if_required",
      "customer_details": {
        "address": {
          "city": "Walnut Creek",
          "country": "US",
          "line1": "2255 Ygnacio Valley Road",
          "line2": "suit w",
          "postal_code": "94598",
          "state": "CA"
        },
        "email": "sumit.cmu@gmail.com",
        "name": "piyush das",
        "phone": null,
        "tax_exempt": "none",
        "tax_ids": []
      },
      "customer_email": null,
      "discounts": [],
      "expires_at": 1754456055,
      "invoice": null,
      "invoice_creation": {
        "enabled": false,
        "invoice_data": {
          "account_tax_ids": null,
          "custom_fields": null,
          "description": null,
          "footer": null,
          "issuer": null,
          "metadata": {},
          "rendering_options": null
        }
      },
      "livemode": true,
      "locale": "auto",
      "metadata": {},
      "mode": "payment",
      "origin_context": null,
      "payment_intent": "pi_3Rscu5Q0mQabLsGQ05akWDTr",
      "payment_link": "plink_1RscWzQ0mQabLsGQvNv9RIIT",
      "payment_method_collection": "if_required",
      "payment_method_configuration_details": {
        "id": "pmc_1RpvisQ0mQabLsGQHCRGVH6Z",
        "parent": null
      },
      "payment_method_options": {
        "card": {
          "request_three_d_secure": "automatic"
        }
      },
      "payment_method_types": [
        "card",
        "klarna",
        "link",
        "cashapp",
        "amazon_pay"
      ],
      "payment_status": "paid",
      "permissions": null,
      "phone_number_collection": {
        "enabled": false
      },
      "recovered_from": null,
      "saved_payment_method_options": null,
      "setup_intent": null,
      "shipping_address_collection": null,
      "shipping_cost": null,
      "shipping_options": [],
      "status": "complete",
      "submit_type": "auto",
      "subscription": null,
      "success_url": "https://stripe.com",
      "total_details": {
        "amount_discount": 0,
        "amount_shipping": 0,
        "amount_tax": 0
      },
      "ui_mode": "hosted",
      "url": null,
      "wallet_options": null
    }
  },
  "livemode": true,
  "pending_webhooks": 1,
  "request": {
    "id": null,
    "idempotency_key": null
  },
  "type": "checkout.session.completed"
}`;

// Create the signature
const timestamp = Math.floor(Date.now() / 1000);
const signedPayload = `${timestamp}.${payload}`;
const signature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(signedPayload, 'utf8')
  .digest('hex');

const stripeSignature = `t=${timestamp},v1=${signature}`;

console.log('=== VERCEL WEBHOOK TEST WITH EXACT PAYLOAD ===');
console.log('Target URL:', `https://${VERCEL_DOMAIN}/api/webhook`);
console.log('Webhook Secret:', WEBHOOK_SECRET.substring(0, 10) + '...');
console.log('Timestamp:', timestamp);
console.log('Signature:', stripeSignature);
console.log('Payload length:', payload.length);

// Test the webhook endpoint
const options = {
  hostname: VERCEL_DOMAIN,
  port: 443,
  path: '/api/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Stripe-Signature': stripeSignature,
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`\n=== RESPONSE ===`);
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${data}`);
    
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

req.write(payload);
req.end();

console.log('\n=== SENDING REQUEST ===');
console.log(`URL: https://${VERCEL_DOMAIN}/api/webhook`); 