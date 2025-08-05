import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    await new Promise((resolve, reject) => {
      req.on('end', resolve);
      req.on('error', reject);
    });
    const rawBody = Buffer.concat(chunks).toString('utf8');
    
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Received webhook event:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    console.log('Processing checkout session:', session.id);
    console.log('Payment status:', session.payment_status);
    console.log('Customer details:', session.customer_details);
    
    if (session.payment_status !== 'paid') {
      console.log('Payment not completed, skipping user creation');
      return res.json({ received: true });
    }
    
    let customerEmail = session.customer_email;
    
    if (!customerEmail && session.customer_details && session.customer_details.email) {
      customerEmail = session.customer_details.email;
    }
    
    if (!customerEmail && session.customer) {
      try {
        const customer = await stripe.customers.retrieve(session.customer);
        customerEmail = customer.email;
      } catch (error) {
        console.error('Error retrieving customer:', error);
      }
    }
    
    if (!customerEmail) {
      console.error('No customer email found in session');
      return res.status(400).json({ error: 'No customer email found' });
    }
    
    console.log('Creating credentials for email:', customerEmail);
    
    try {
      const credentials = await createUserCredentials(customerEmail);
      await sendCredentialsEmail(customerEmail, credentials);
      console.log('Successfully created user and sent credentials');
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Failed to process payment' });
    }
  }

  res.json({ received: true });
}

async function createUserCredentials(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email provided');
  }
  
  const username = email.split('@')[0] + '_' + Date.now();
  const password = generateSecurePassword();
  
  const user = {
    email: email.toLowerCase(),
    username,
    password,
    accessLevel: 'full',
    createdAt: new Date().toISOString(),
    isDemo: false,
    stripeCustomerId: null, // Could be added if needed
    subscriptionStatus: 'active'
  };
  
  await saveUserToDatabase(user);
  
  return { username, password };
}

async function saveUserToDatabase(user) {
  try {
    // Create users directory if it doesn't exist
    const usersDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir, { recursive: true });
    }
    
    const usersFile = path.join(usersDir, 'users.json');
    
    // Read existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
      const fileContent = fs.readFileSync(usersFile, 'utf8');
      users = JSON.parse(fileContent);
    }
    
    // Check if user already exists
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    if (existingUserIndex !== -1) {
      // Update existing user
      users[existingUserIndex] = { ...users[existingUserIndex], ...user };
    } else {
      // Add new user
      users.push(user);
    }
    
    // Write back to file
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    
    console.log('User saved to database:', user.email);
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
}

function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function sendCredentialsEmail(email, credentials) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured, skipping email send');
    return;
  }

  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to PM Guide! 🎉</h2>
          <p>Your purchase was successful. Here are your login credentials:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Username:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${credentials.username}</code></p>
            <p><strong>Password:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${credentials.password}</code></p>
          </div>
          
          <p><strong>Login at:</strong> <a href="${process.env.APP_URL || 'https://yourdomain.com'}" style="color: #2563eb;">${process.env.APP_URL || 'https://yourdomain.com'}</a></p>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>⚠️ Important:</strong> Please keep these credentials safe and don't share them with anyone.</p>
          </div>
          
          <p>You now have access to all 20+ simulators and complete case studies!</p>
          
          <p>Best regards,<br>The PM Guide Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Credentials email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending credentials email:', error);
    throw error;
  }
} 