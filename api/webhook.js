import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure Vercel to not parse the body
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
    // Get raw body
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

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment successful for:', session.customer_email);
    
    try {
      // Generate credentials
      const credentials = await createUserCredentials(session.customer_email);
      
      // Send email
      await sendCredentialsEmail(session.customer_email, credentials);
      
      console.log('✅ Payment processed and credentials sent!');
    } catch (error) {
      console.error('❌ Error processing payment:', error);
    }
  }

  res.json({ received: true });
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
  // For Vercel, you might want to use a database instead of file storage
  // For now, we'll log the user data
  console.log('User created:', {
    email: user.email,
    username: user.username,
    accessLevel: user.accessLevel
  });
  
  // TODO: Replace with actual database storage
  // Examples: Supabase, MongoDB, PostgreSQL
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