require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true
}));

// Initialize Mailchimp client
if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER_PREFIX) {
  try {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
    console.log('Mailchimp client initialized');
  } catch (error) {
    console.error('Failed to initialize Mailchimp client:', error);
  }
          } else {
            console.log('Mailchimp environment variables not configured');
          }

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

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Store subscriber in local file for now
    const subscribersFile = path.join(__dirname, 'subscribers.json');
    let subscribers = [];
    
    if (fs.existsSync(subscribersFile)) {
      subscribers = JSON.parse(fs.readFileSync(subscribersFile, 'utf8'));
    }
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
      return res.status(200).json({ 
        success: true, 
        message: 'Already subscribed to PM Guide' 
      });
    }
    
    // Add new subscriber
    const newSubscriber = {
      email: email.toLowerCase(),
      subscribed_at: new Date().toISOString(),
      status: 'active'
    };
    
    subscribers.push(newSubscriber);
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    
    // Add to Mailchimp if configured
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        await addToMailchimp(email);
        console.log('Subscriber added to Mailchimp:', email);
      } catch (error) {
        console.error('Error adding to Mailchimp:', error);
        // Don't fail the subscription if Mailchimp fails
      }
                  } else {
                console.log('Mailchimp not configured, skipping Mailchimp integration');
              }

    // Send welcome email if email service is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await sendWelcomeEmail(email);
        console.log('Welcome email sent to:', email);
      } catch (error) {
        console.error('Error sending welcome email:', error);
        // Don't fail the subscription if email fails
      }
    }

    console.log('Subscription successful:', email);
    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to PM Guide' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      error: 'Failed to subscribe. Please try again.' 
    });
  }
});

// Send welcome email function
async function sendWelcomeEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to PM Guide! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to PM Guide!</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Product Management Framework Library</p>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; margin-top: 0;">Thank you for subscribing! 🚀</h2>
          
          <p style="color: #666; line-height: 1.6;">
            You now have access to our comprehensive collection of product management frameworks, 
            simulators, and real-world case studies.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What you can access:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>✅ 20+ Interactive Framework Simulators</li>
              <li>✅ Real-world Case Studies (Netflix, Spotify, Airbnb)</li>
              <li>✅ Growth & Analytics Tools</li>
              <li>✅ Weekly PM Insights & Updates</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.APP_URL || 'http://localhost:3000'}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Start Exploring Now
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            You'll receive weekly updates about new frameworks, case studies, and product management insights.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you have any questions, feel free to reply to this email.<br>
            PM Guide Team
          </p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

// Mailchimp integration function
async function addToMailchimp(email) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.log('Mailchimp not configured, skipping');
    return;
  }
  
  try {
    const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: email.split('@')[0],
        LNAME: '',
        SOURCE: 'PM Guide Website'
      },
      tags: ['PM Guide Subscriber', 'Product Management']
    });
    
    console.log('Successfully added to Mailchimp:', response.email_address);
    return response;
  } catch (error) {
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      console.log('Subscriber already exists in Mailchimp:', email);
      return { status: 'already_exists' };
    }
    throw error;
  }
}

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
  const transporter = nodemailer.createTransport({
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

// Serve static files from the React app build directory (if it exists)
const buildPath = path.join(__dirname, 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // For any other request, send back React's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // If build directory doesn't exist, serve a simple message
  app.get('*', (req, res) => {
    res.json({ 
      message: 'PM Guide API Server Running', 
      note: 'Please run "npm run build" to build the React app',
      endpoints: {
        subscribe: 'POST /api/subscribe',
        health: 'GET /health',
        webhook: 'POST /webhook'
      }
    });
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
});

module.exports = app; 