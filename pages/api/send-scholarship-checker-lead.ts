// pages/api/send-scholarship-checker-lead.ts — handles POST from /scholarship-checker landing page
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    phone = '',
    city = '',
    time = '',
    course = '',
    category = '',
    income = '',
    gender = '',
    domicile = '',
  } = req.body;

  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Google Sheets via Apps Script — routes to "Scholarship Checker" sheet
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'scholarship-checker',
          name: name.trim(),
          phone,
          city,
          time,
          course,
          category,
          income,
          gender,
          domicile,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
