// pages/api/send-pharmacy-admission-lead.ts — handles POST from /pharmacy-admission landing page
import type { NextApiRequest, NextApiResponse } from 'next';
import Script from "next/script";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_DPHARM_FB_PIXEL_ID;
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_DPHARM_GOOGLE_TAG_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    phone = '',
    course = '',
    branch = '',
  } = req.body;

  if (!name.trim() || !phone.trim()) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Google Sheets via Apps Script — routes to "Pharmacy-admission" sheet
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  console.log('[DEBUG] GOOGLE_SCRIPT_URL:', scriptUrl);

  if (scriptUrl) {
    try {
      const payload = {
        type: 'pharmacy-admission',
        name: name.trim(),
        phone,
        course,
        branch,
        timestamp: new Date().toISOString(),
      };
      console.log('[DEBUG] Sending payload:', JSON.stringify(payload));

      const gsRes = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const gsText = await gsRes.text();
      console.log('[DEBUG] Google Script response:', gsRes.status, gsText);
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  } else {
    console.log('[DEBUG] GOOGLE_SCRIPT_URL is not set!');
  }

  return res.status(200).json({ ok: true });
}
