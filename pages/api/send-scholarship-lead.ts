// pages/api/send-scholarship-lead.ts — handles POST from /scholarship-tool form
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    phone = '',
    email = '',
    course = '',
    scheme = '',
    schemeRef = '',
    category = '',
    income = '',
    timestamp,
  } = req.body;

  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#047857;color:white;padding:16px 24px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;font-size:20px;">Scholarship Enquiry — New Lead</h2>
      </div>
      <div style="background:#ecfdf5;padding:24px;border-radius:0 0 8px 8px;">

        <h3 style="color:#047857;margin-top:0;">Student Details</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
          <tr style="background:#d1fae5;">
            <td style="font-weight:bold;width:40%;padding:8px 12px;">Name</td>
            <td style="padding:8px 12px;">${name.trim()}</td>
          </tr>
          <tr>
            <td style="font-weight:bold;padding:8px 12px;">Phone</td>
            <td style="padding:8px 12px;">${phone}</td>
          </tr>
          ${email ? `<tr style="background:#d1fae5;"><td style="font-weight:bold;padding:8px 12px;">Email</td><td style="padding:8px 12px;">${email}</td></tr>` : ''}
          <tr${email ? '' : ' style="background:#d1fae5;"'}>
            <td style="font-weight:bold;padding:8px 12px;">Interested Course</td>
            <td style="padding:8px 12px;font-weight:600;color:#047857;">${course}</td>
          </tr>
          ${category ? `<tr><td style="font-weight:bold;padding:8px 12px;">Caste Category</td><td style="padding:8px 12px;">${category}</td></tr>` : ''}
          ${income ? `<tr style="background:#d1fae5;"><td style="font-weight:bold;padding:8px 12px;">Family Income</td><td style="padding:8px 12px;">${income}</td></tr>` : ''}
        </table>

        <h3 style="color:#047857;margin-top:20px;">Scholarship of Interest</h3>
        <div style="background:#fff;border:1px solid #a7f3d0;border-radius:8px;padding:14px 16px;">
          <div style="font-size:16px;font-weight:600;color:#134e4a;">${scheme}</div>
          ${schemeRef ? `<div style="font-size:12px;color:#6b7280;margin-top:4px;">Reference: ${schemeRef}</div>` : ''}
        </div>

        <p style="color:#6b7280;font-size:12px;margin-top:16px;">Submitted ${ts} IST</p>
      </div>
    </div>
  `;

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { email: process.env.BREVO_SENDER!, name: 'ABS Website' },
        to: [{ email: 'bwtnaresh@gmail.com', name: 'Naresh' }],
        subject: `🎓 Scholarship Lead — ${name.trim()} | ${scheme}`,
        htmlContent,
        replyTo: email ? { email, name: name.trim() } : undefined,
      }),
    });

    if (!brevoRes.ok) {
      console.error('Brevo API error:', await brevoRes.json());
    }
  } catch (err) {
    console.error('Brevo send error:', err);
  }

  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'scholarship',
          name: name.trim(),
          phone,
          email,
          course,
          scheme,
          schemeRef,
          category,
          income,
          timestamp: timestamp || new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
