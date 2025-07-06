const brevo = require('@getbrevo/brevo');

// Initialize Brevo API client
let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Transactional Email API instance
const apiInstance = new brevo.TransactionalEmailsApi();

/**
 * Send transactional email using Brevo API
 */
export async function sendTransactionalEmail({ to, subject, htmlContent, textContent, fromName, fromEmail }) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent;
    sendSmtpEmail.sender = { 
      name: fromName || process.env.FROM_NAME || 'Website Contact',
      email: fromEmail || process.env.FROM_EMAIL 
    };
    sendSmtpEmail.to = Array.isArray(to) ? to : [{ email: to }];
    
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Send email using SMTP (alternative method)
 */
export async function sendEmailSMTP({ to, subject, html, text, from }) {
  const nodemailer = require('nodemailer');
  
  try {
    const transporter = nodemailer.createTransporter({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: from || `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('SMTP Error:', error);
    throw new Error(`Failed to send email via SMTP: ${error.message}`);
  }
}

/**
 * Add contact to Brevo list (optional)
 */
export async function addContactToList(email, firstName, lastName, listId = 1) {
  try {
    const contactsApi = new brevo.ContactsApi();
    const createContact = new brevo.CreateContact();
    
    createContact.email = email;
    createContact.attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName
    };
    createContact.listIds = [listId];
    
    const response = await contactsApi.createContact(createContact);
    return { success: true, id: response.id };
  } catch (error) {
    console.error('Add Contact Error:', error);
    throw new Error(`Failed to add contact: ${error.message}`);
  }
}