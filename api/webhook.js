import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Supabase client with error handling
let supabase;
try {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabase = null;
}

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
      console.log('Credentials created successfully:', { username: credentials.username });
      
      try {
        await sendCredentialsEmail(customerEmail, credentials);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed, but continuing:', emailError.message);
        // Don't fail the whole process if email fails
      }
      
      console.log('Successfully created user and sent credentials');
    } catch (error) {
      console.error('Error processing payment:', error);
      console.error('Error stack:', error.stack);
      return res.status(500).json({ 
        error: 'Failed to process payment',
        details: error.message 
      });
    }
  }

  res.json({ received: true });
}

async function createUserCredentials(email) {
  console.log('Starting createUserCredentials for email:', email);
  
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email provided');
  }
  
  try {
    const username = email.split('@')[0] + '_' + Date.now();
    const password = generateSecurePassword();
    
    const user = {
      email: email.toLowerCase(),
      username,
      password,
      access_level: 'full',
      created_at: new Date().toISOString(),
      is_demo: false,
      subscription_status: 'active',
      stripe_customer_id: null // Could be added if needed
    };
    
    // PRODUCTION: Save to Supabase database
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && supabase) {
      console.log('Supabase configured, attempting to save user');
      await saveUserToSupabase(user);
    } else {
      console.warn('Supabase not configured, logging user creation only');
      console.log('Missing environment variables:');
      console.log('- SUPABASE_URL:', !!process.env.SUPABASE_URL);
      console.log('- SUPABASE_ANON_KEY:', !!process.env.SUPABASE_ANON_KEY);
      console.log('- Supabase client:', !!supabase);
      console.log('User created (not saved to database):', {
        email: user.email,
        username: user.username,
        accessLevel: user.access_level,
        subscriptionStatus: user.subscription_status
      });
    }
    
    return { username, password };
  } catch (error) {
    console.error('Error in createUserCredentials:', error);
    throw error;
  }
}

// PRODUCTION: Save user to Supabase
async function saveUserToSupabase(user) {
  try {
    console.log('Saving user to Supabase:', user.email);
    console.log('Supabase URL:', process.env.SUPABASE_URL);
    console.log('Supabase key configured:', !!process.env.SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase
      .from('users')
      .upsert([user], { onConflict: 'email' });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('User saved to Supabase successfully:', user.email);
    return data;
  } catch (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  }
}

function generateSecurePassword() {
  try {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  } catch (error) {
    console.error('Error generating password:', error);
    throw error;
  }
}

async function sendCredentialsEmail(email, credentials) {
  console.log('Starting sendCredentialsEmail for:', email);
  console.log('EMAIL_USER configured:', !!process.env.EMAIL_USER);
  console.log('EMAIL_PASS configured:', !!process.env.EMAIL_PASS);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured, skipping email send');
    console.log('=== CREDENTIALS GENERATED ===');
    console.log('Email:', email);
    console.log('Username:', credentials.username);
    console.log('Password:', credentials.password);
    console.log('Access Level:', 'full');
    console.log('Subscription Status:', 'active');
    console.log('=== END CREDENTIALS ===');
    console.log('To configure email, add EMAIL_USER and EMAIL_PASS environment variables in Vercel');
    return;
  }

  try {
    console.log('Creating email transporter...');
    
    // Fix the nodemailer import issue
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // Add additional options for better debugging
      debug: true,
      logger: true
    });

    console.log('Email transporter created successfully');

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

    console.log('Sending email to:', email);
    console.log('From:', process.env.EMAIL_USER);
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    console.log('Credentials email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending credentials email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    throw error;
  }
} 