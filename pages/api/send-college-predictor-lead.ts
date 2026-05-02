// pages/api/send-college-predictor-lead.ts — handles POST from both college predictor versions
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    mobile = '',
    phone = '',
    email = '',
    neetScore,
    twelfthPCB,
    category = '',
    regions = [],
    domicile = '',
    eligible,
    course = '',
    topColleges = [],
  } = req.body;

  const contactPhone = (mobile || phone || '').toString().trim();

  if (!name.trim() || !contactPhone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Google Sheets + email via Apps Script
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'neet',
          name: name.trim(),
          mobile: contactPhone,
          email,
          neetScore,
          twelfthPCB,
          category,
          course,
          regions,
          domicile,
          eligible,
          safeCount: req.body.safeCount,
          moderateCount: req.body.moderateCount,
          reachCount: req.body.reachCount,
          topColleges,
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
