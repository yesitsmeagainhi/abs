import { sendTransactionalEmail, addContactToList } from '../../lib/brevo';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, phone } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email templates
    const adminEmailHTML = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p><small>Sent from website contact form</small></p>
    `;

    const adminEmailText = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      Subject: ${subject || 'No subject'}
      
      Message:
      ${message}
      
      ---
      Sent from website contact form
    `;

    const userEmailHTML = `
      <h2>Thank you for contacting us!</h2>
      <p>Hi ${name},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p><strong>Your message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p>Best regards,<br>Your Team</p>
    `;

    const userEmailText = `
      Thank you for contacting us!
      
      Hi ${name},
      
      We've received your message and will get back to you as soon as possible.
      
      Your message:
      ${message}
      
      Best regards,
      Your Team
    `;

    // Send email to admin
    await sendTransactionalEmail({
      to: process.env.TO_EMAIL,
      subject: `Contact Form: ${subject || 'New Message'}`,
      htmlContent: adminEmailHTML,
      textContent: adminEmailText,
    });

    // Send confirmation email to user
    await sendTransactionalEmail({
      to: email,
      subject: 'Thank you for your message',
      htmlContent: userEmailHTML,
      textContent: userEmailText,
    });

    // Optional: Add contact to Brevo list
    // await addContactToList(email, name.split(' ')[0], name.split(' ')[1] || '', 1);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
}