import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
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
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'PM Guide - Email Test',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Test Successful! 🎉</h2>
          <p>Your email configuration is working correctly.</p>
          <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    res.json({ success: true, message: 'Test email sent!' });
  } catch (error) {
    console.error('❌ Email test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: {
        emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
        emailPass: process.env.EMAIL_PASS ? 'Set' : 'Not set'
      }
    });
  }
} 