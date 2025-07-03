// pages/api/lead.ts   — handles POST from the contact form
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const { name = '', phone = '', email = '', query = '' } = req.body;
  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    /* Send email via Brevo API using fetch */
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { 
          email: process.env.BREVO_SENDER!, 
          name: 'ABS Website' 
        },
        to: [{ 
          email: process.env.BREVO_RECIPIENT!, 
          name: 'Counsellor' 
        }],
        subject: '🔔 New website enquiry',
        htmlContent: `
          <h2>Lead details</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone}</p>
          ${email ? `<p><b>Email:</b> ${email}</p>` : ''}
          ${query ? `<p><b>Query:</b><br>${query}</p>` : ''}
          <hr><small>Sent ${new Date().toLocaleString()}</small>
        `,
        replyTo: email ? { email, name } : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      throw new Error(`Brevo API error: ${response.status}`);
    }

    /* 2. You can push to Google-Sheets / CRM here */

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Send failed' });
  }
}