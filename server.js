require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();

// Webhook endpoint - must be before express.json() middleware
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Get the raw body for webhook signature verification
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    await new Promise((resolve, reject) => {
      req.on('end', resolve);
      req.on('error', reject);
    });
    const rawBody = Buffer.concat(chunks).toString('utf8');
    
    console.log('Webhook signature verification starting...');
    console.log('Raw body length:', rawBody.length);
    console.log('Stripe signature header:', !!sig);
    console.log('Webhook secret configured:', !!process.env.STRIPE_WEBHOOK_SECRET);
    
    // Use environment variable or fallback to test secret
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret_for_testing';
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log('✅ Webhook signature verification successful!');
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    console.error('Error details:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Get customer email from the correct location
    let customerEmail = session.customer_email;
    if (!customerEmail && session.customer_details && session.customer_details.email) {
      customerEmail = session.customer_details.email;
    }
    
    console.log('Payment successful for:', customerEmail);
    console.log('Payment status:', session.payment_status);
    
    // Only process if payment is actually paid
    if (session.payment_status !== 'paid') {
      console.log('Payment not completed, skipping user creation');
      return res.json({ received: true });
    }
    
    if (!customerEmail) {
      console.error('No customer email found in session');
      return res.status(400).json({ error: 'No customer email found' });
    }
    
    try {
      // Generate credentials
      const credentials = await createUserCredentials(customerEmail);
      
      // Send email
      await sendCredentialsEmail(customerEmail, credentials);
      
      console.log('✅ Payment processed and credentials sent!');
    } catch (error) {
      console.error('❌ Error processing payment:', error);
    }
  }

  res.json({received: true});
});

// Add express.json() middleware after webhook endpoint
app.use(express.json());

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
    createdAt: new Date(),
    isDemo: false
  };
  
  // Save to your storage (database/file)
  await saveUserToDatabase(user);
  
  return { username, password };
}

// Save user to database/file
async function saveUserToDatabase(user) {
  const usersFile = path.join(__dirname, 'users.json');
  
  try {
    let users = [];
    if (fs.existsSync(usersFile)) {
      users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    }
    
    users.push(user);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    console.log('User saved to database:', user.email);
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

// Generate secure password
function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Send credentials email
async function sendCredentialsEmail(email, credentials) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password, not regular password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your PM Guide Access Credentials',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to PM Guide! 🎉</h2>
        <p>Your purchase was successful. Here are your login credentials:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Username:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${credentials.username}</code></p>
          <p><strong>Password:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${credentials.password}</code></p>
        </div>
        
        <p><strong>Login at:</strong> <a href="https://yourdomain.com" style="color: #2563eb;">https://yourdomain.com</a></p>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;"><strong>⚠️ Important:</strong> Please keep these credentials safe and don't share them with anyone.</p>
        </div>
        
        <p>You now have access to all 20+ simulators and complete case studies!</p>
        
        <p>Best regards,<br>The PM Guide Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
});

module.exports = app; 