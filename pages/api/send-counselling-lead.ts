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

  // Google Sheets + email via Apps Script
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
