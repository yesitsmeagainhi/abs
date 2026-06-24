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
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pharmacy-admission',
          name: name.trim(),
          phone,
          course,
          branch,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
