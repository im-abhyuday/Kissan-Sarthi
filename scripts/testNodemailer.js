import nodemailer from 'nodemailer';

/**
 * NodeMailer Test Script for Kissan Sarthi
 * 
 * As requested, this script demonstrates how to send an email using 
 * your Kissan Sarthi Gmail account and App Password.
 * 
 * NOTE: For user signups in Kissan Sarthi, it is highly recommended to configure 
 * these exact credentials directly in the Supabase Dashboard (Auth -> SMTP).
 * That way, Supabase handles email confirmations automatically without needing a custom NodeJS backend!
 */

const sendTestEmail = async () => {
  // 1. Create a transporter using your provided Gmail app password
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // SSL
    secure: true,
    auth: {
      user: 'kissansarthiorg@gmail.com',
      pass: 'lgid wwvf ptxc jmxu'
    }
  });

  try {
    console.log('Attempting to send test email...');
    
    // 2. Send the email
    const info = await transporter.sendMail({
      from: '"Kissan Sarthi Support" <kissansarthiorg@gmail.com>',
      to: 'kissansarthiorg@gmail.com', // Sending to yourself as a test
      subject: 'Welcome to Kissan Sarthi! 🌾',
      text: 'This is a test email sent via Nodemailer using your App Password.',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Welcome to Kissan Sarthi! 🌾</h2>
          <p>This is a test email sent via <b>Nodemailer</b> using your App Password.</p>
          <hr />
          <p><i>Note: To use this for Supabase auth confirmations, plug these credentials into your Supabase SMTP settings!</i></p>
        </div>
      `
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};

sendTestEmail();
