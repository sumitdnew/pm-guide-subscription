import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Supabase client for storing subscribers
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    console.log('Supabase client initialized for subscriptions');
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

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
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    // Store subscriber in Supabase if available
    if (supabase) {
      try {
        const { error } = await supabase
          .from('subscribers')
          .upsert([{
            email: email.toLowerCase(),
            subscribed_at: new Date().toISOString(),
            status: 'active'
          }], { onConflict: 'email' });

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('Subscriber saved to Supabase:', email);
        }
      } catch (error) {
        console.error('Error saving to Supabase:', error);
      }
    }

    // Add to Mailchimp if configured
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        await addToMailchimp(email);
        console.log('Subscriber added to Mailchimp:', email);
      } catch (error) {
        console.error('Error adding to Mailchimp:', error);
        // Don't fail the subscription if Mailchimp fails
      }
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
}

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
            <a href="${process.env.APP_URL || 'https://yourdomain.com'}" 
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
