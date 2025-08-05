import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Testing email configuration...');
  console.log('EMAIL_USER configured:', !!process.env.EMAIL_USER);
  console.log('EMAIL_PASS configured:', !!process.env.EMAIL_PASS);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(400).json({ 
      error: 'Email credentials not configured',
      emailUser: !!process.env.EMAIL_USER,
      emailPass: !!process.env.EMAIL_PASS
    });
  }

  try {
    console.log('Creating email transporter...');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true,
      logger: true
    });

    console.log('Email transporter created successfully');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test Email from PM Guide Webhook',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Test Email 🧪</h2>
          <p>This is a test email to verify your email configuration is working.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
          </div>
          
          <p>If you receive this email, your email configuration is working correctly!</p>
          
          <p>Best regards,<br>PM Guide System</p>
        </div>
      `
    };

    console.log('Sending test email...');
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully:', result);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message,
      code: error.code
    });
  }
} 