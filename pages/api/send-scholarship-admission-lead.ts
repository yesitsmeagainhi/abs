// pages/api/send-scholarship-admission-lead.ts — handles POST from /scholarship-admission landing page
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    phone = '',
    course = '',
    city = '',
  } = req.body;

  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Google Sheets via Apps Script — routes to "Scholarship Admission" sheet
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'scholarship-admission',
          name: name.trim(),
          phone,
          course,
          city,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
