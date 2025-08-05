# Automated Credential Creation & Email Delivery Setup

## Overview
When customers complete a purchase through Stripe, we need to:
1. **Detect the payment** via Stripe webhook
2. **Create user credentials** automatically
3. **Send email** with login details
4. **Grant access** to the full system

## Implementation Options

### Option 1: Stripe Webhooks + Backend API (Recommended)

#### 1. Set Up Stripe Webhook
```bash
# Install Stripe CLI for testing
npm install -g stripe-cli

# Listen for webhook events
stripe listen --forward-to localhost:3001/webhook
```

#### 2. Create Webhook Endpoint
Create `server.js` or use existing server:

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Generate credentials
    const credentials = await createUserCredentials(session.customer_email);
    
    // Send email
    await sendCredentialsEmail(session.customer_email, credentials);
    
    console.log('Payment processed and credentials sent!');
  }

  res.json({received: true});
});

// Generate user credentials
async function createUserCredentials(email) {
  const username = email.split('@')[0] + '_' + Date.now();
  const password = generateSecurePassword();
  
  // Store in database or file
  const user = {
    email,
    username,
    password,
    accessLevel: 'full',
    createdAt: new Date()
  };
  
  // Save to your storage (database/file)
  await saveUserToDatabase(user);
  
  return { username, password };
}

// Send credentials email
async function sendCredentialsEmail(email, credentials) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your PM Guide Access Credentials',
    html: `
      <h2>Welcome to PM Guide!</h2>
      <p>Your purchase was successful. Here are your login credentials:</p>
      <p><strong>Username:</strong> ${credentials.username}</p>
      <p><strong>Password:</strong> ${credentials.password}</p>
      <p>Login at: <a href="https://yourdomain.com">https://yourdomain.com</a></p>
      <p>Please keep these credentials safe!</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

app.listen(3001, () => {
  console.log('Webhook server running on port 3001');
});
```

#### 3. Environment Variables
Create `.env` file:
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Option 2: Serverless Functions (Vercel/Netlify)

#### 1. Create Vercel Function
Create `api/webhook.js`:

```javascript
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Create credentials and send email
    await processSuccessfulPayment(session);
  }

  res.json({ received: true });
}

async function processSuccessfulPayment(session) {
  // Generate credentials
  const credentials = await createUserCredentials(session.customer_email);
  
  // Send email
  await sendCredentialsEmail(session.customer_email, credentials);
}

// ... rest of the functions same as above
```

### Option 3: Third-Party Services

#### 1. Zapier Integration
- Connect Stripe to Zapier
- Zapier triggers on successful payment
- Zapier sends email with credentials

#### 2. Make.com (Integromat)
- Similar to Zapier but more powerful
- Can handle complex automation flows

## Database Storage Options

### Option A: Simple File Storage
```javascript
const fs = require('fs');

async function saveUserToDatabase(user) {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}
```

### Option B: MongoDB
```javascript
const { MongoClient } = require('mongodb');

async function saveUserToDatabase(user) {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('pmguide');
  await db.collection('users').insertOne(user);
  await client.close();
}
```

### Option C: Supabase/PostgreSQL
```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function saveUserToDatabase(user) {
  const { data, error } = await supabase
    .from('users')
    .insert([user]);
}
```

## Email Service Options

### 1. Gmail (Free)
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Use App Password, not regular password
  }
});
```

### 2. SendGrid (Recommended for production)
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendCredentialsEmail(email, credentials) {
  const msg = {
    to: email,
    from: 'noreply@yourdomain.com',
    subject: 'Your PM Guide Access Credentials',
    html: `<h2>Welcome!</h2><p>Username: ${credentials.username}</p>...`
  };
  
  await sgMail.send(msg);
}
```

### 3. Resend.com (Modern alternative)
```javascript
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendCredentialsEmail(email, credentials) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Your PM Guide Access Credentials',
    html: `<h2>Welcome!</h2>...`
  });
}
```

## Security Considerations

### 1. Password Generation
```javascript
function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
```

### 2. Webhook Verification
Always verify webhook signatures to prevent fake requests.

### 3. Rate Limiting
Implement rate limiting to prevent abuse.

## Testing

### 1. Test Webhook Locally
```bash
stripe listen --forward-to localhost:3001/webhook
```

### 2. Test Payment Flow
1. Make a test purchase
2. Check webhook logs
3. Verify email delivery
4. Test login with new credentials

## Deployment

### 1. Vercel (Recommended)
- Deploy API routes
- Set environment variables
- Configure webhook URL in Stripe dashboard

### 2. Heroku
- Deploy Node.js app
- Set environment variables
- Configure webhook URL

### 3. Railway/Render
- Similar to Heroku
- Easy deployment and environment management

## Next Steps

1. **Choose your implementation** (Backend API recommended)
2. **Set up Stripe webhook** in dashboard
3. **Deploy your webhook endpoint**
4. **Test the complete flow**
5. **Monitor and iterate**

This automation will handle the entire post-purchase flow automatically! 