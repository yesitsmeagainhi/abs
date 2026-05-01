// pages/api/send-counselling-lead.ts — handles POST from /counselling career tool
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow CORS for the iframe-embedded HTML page on the same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    phone = '',
    email = '',
    pin = '',
    course = '',
    answers = {},
    timestamp,
  } = req.body;

  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Label map to make answer keys human-readable in the email
  const LABELS: Record<string, string> = {
    stream: 'Stream',
    percentage: '12th Percentage',
    entrance: 'Entrance Exam',
    examScore: 'Exam Score / Percentile',
    subjects: 'Favourite Subjects',
    goals: 'Career Goals',
    environment: 'Work Environment',
    duration: 'Course Duration Preference',
    budget: 'Family Budget',
    location: 'Preferred Location',
  };

  const answerRows = Object.entries(answers)
    .map(([k, v]) => {
      const label = LABELS[k] || k;
      const val = Array.isArray(v) ? v.join(', ') : String(v);
      return `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#1d4ed8;width:40%;border-bottom:1px solid #dbeafe;">${label}</td>
          <td style="padding:8px 12px;color:#1f2937;border-bottom:1px solid #dbeafe;">${val}</td>
        </tr>`;
    })
    .join('');

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1d4ed8;color:white;padding:16px 24px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;font-size:20px;">Career Counselling — New Lead</h2>
      </div>
      <div style="background:#eff6ff;padding:24px;border-radius:0 0 8px 8px;">

        <h3 style="color:#1d4ed8;margin-top:0;">Student Details</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
          <tr style="background:#dbeafe;">
            <td style="font-weight:bold;width:40%;padding:8px 12px;">Name</td>
            <td style="padding:8px 12px;">${name.trim()}</td>
          </tr>
          <tr>
            <td style="font-weight:bold;padding:8px 12px;">Phone</td>
            <td style="padding:8px 12px;">${phone}</td>
          </tr>
          ${email ? `<tr style="background:#dbeafe;"><td style="font-weight:bold;padding:8px 12px;">Email</td><td style="padding:8px 12px;">${email}</td></tr>` : ''}
          <tr${email ? '' : ' style="background:#dbeafe;"'}>
            <td style="font-weight:bold;padding:8px 12px;">Pincode</td>
            <td style="padding:8px 12px;">${pin}</td>
          </tr>
          <tr style="background:#dbeafe;">
            <td style="font-weight:bold;padding:8px 12px;">Course Interest</td>
            <td style="padding:8px 12px;font-weight:600;color:#1d4ed8;">${course}</td>
          </tr>
        </table>

        ${answerRows ? `
        <h3 style="color:#1d4ed8;margin-top:20px;">Questionnaire Answers</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #bfdbfe;border-radius:8px;overflow:hidden;">
          ${answerRows}
        </table>` : ''}

        <p style="color:#6b7280;font-size:12px;margin-top:16px;">Submitted ${ts} IST</p>
      </div>
    </div>
  `;

  // 1. Email via Brevo
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
        subject: `🎓 Counselling Lead — ${name.trim()} | ${course}`,
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

  // 2. Google Sheets via Apps Script (fire-and-forget)
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'counselling',
          name: name.trim(),
          phone,
          email,
          pin,
          course,
          answers,
          timestamp: timestamp || new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
