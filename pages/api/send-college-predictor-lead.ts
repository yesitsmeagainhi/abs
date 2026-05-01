// pages/api/send-college-predictor-lead.ts — handles POST from both college predictor versions
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const {
    name = '',
    // NEET predictor uses "mobile"; v1 uses "phone"
    mobile = '',
    phone = '',
    email = '',
    // NEET predictor fields
    neetScore,
    twelfthPCB,
    category = '',
    regions = [],
    domicile = '',
    eligible,
    // v1 predictor fields
    stream = '',
    percentage = '',
    entranceExam = '',
    examScore = '',
    // shared
    course = '',
    budget = '',
    location = '',
    topColleges = [],
  } = req.body;

  const contactPhone = (mobile || phone || '').toString().trim();

  if (!name.trim() || !contactPhone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const collegeList = Array.isArray(topColleges) && topColleges.length > 0
    ? topColleges.join(', ')
    : 'No matches found';

  const isNEETPredictor = neetScore !== undefined;
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const subject = isNEETPredictor
    ? `🎓 NEET Predictor Lead — ${name.trim()} | ${course} | NEET ${neetScore}`
    : `🎓 College Predictor Lead — ${name.trim()} | ${course}`;

  const htmlContent = isNEETPredictor
    ? `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#065f46;color:white;padding:16px 24px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:20px;">NEET College Predictor — New Lead</h2>
        </div>
        <div style="background:#f0fdf4;padding:24px;border-radius:0 0 8px 8px;">
          <h3 style="color:#065f46;margin-top:0;">Student Details</h3>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr style="background:#d1fae5;">
              <td style="font-weight:bold;width:40%;padding:8px 12px;">Name</td>
              <td style="padding:8px 12px;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">Mobile</td>
              <td style="padding:8px 12px;">${contactPhone}</td>
            </tr>
            ${email ? `<tr style="background:#d1fae5;"><td style="font-weight:bold;padding:8px 12px;">Email</td><td style="padding:8px 12px;">${email}</td></tr>` : ''}
          </table>

          <h3 style="color:#065f46;margin-top:20px;">Academic Details</h3>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr style="background:#d1fae5;">
              <td style="font-weight:bold;width:40%;padding:8px 12px;">NEET Score</td>
              <td style="padding:8px 12px;font-size:18px;font-weight:bold;color:#065f46;">${neetScore}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">12th PCB %</td>
              <td style="padding:8px 12px;">${twelfthPCB}%</td>
            </tr>
            <tr style="background:#d1fae5;">
              <td style="font-weight:bold;padding:8px 12px;">Category</td>
              <td style="padding:8px 12px;">${category}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">Eligibility</td>
              <td style="padding:8px 12px;">
                <span style="display:inline-block;padding:2px 10px;border-radius:12px;font-weight:bold;
                  background:${eligible ? '#bbf7d0' : '#fecaca'};
                  color:${eligible ? '#065f46' : '#991b1b'};">
                  ${eligible ? '✓ Eligible' : '✗ Not Eligible'}
                </span>
              </td>
            </tr>
          </table>

          <h3 style="color:#065f46;margin-top:20px;">Preferences</h3>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr style="background:#d1fae5;">
              <td style="font-weight:bold;width:40%;padding:8px 12px;">Course</td>
              <td style="padding:8px 12px;">${course}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">Regions</td>
              <td style="padding:8px 12px;">${Array.isArray(regions) ? regions.join(', ') : regions || 'Any'}</td>
            </tr>
            <tr style="background:#d1fae5;">
              <td style="font-weight:bold;padding:8px 12px;">Domicile</td>
              <td style="padding:8px 12px;">${domicile}</td>
            </tr>
          </table>

          <h3 style="color:#065f46;margin-top:20px;">Top Matched Colleges</h3>
          <p style="background:#fff;border:1px solid #a7f3d0;border-radius:6px;padding:12px;">${collegeList}</p>

          <p style="color:#6b7280;font-size:12px;margin-top:16px;">Submitted ${timestamp} IST</p>
        </div>
      </div>
    `
    : `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1d4ed8;color:white;padding:16px 24px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:20px;">College Predictor — New Lead</h2>
        </div>
        <div style="background:#eff6ff;padding:24px;border-radius:0 0 8px 8px;">
          <h3 style="color:#1d4ed8;margin-top:0;">Student Details</h3>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr style="background:#dbeafe;">
              <td style="font-weight:bold;width:40%;padding:8px 12px;">Name</td>
              <td style="padding:8px 12px;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">Phone</td>
              <td style="padding:8px 12px;">${contactPhone}</td>
            </tr>
            ${email ? `<tr style="background:#dbeafe;"><td style="font-weight:bold;padding:8px 12px;">Email</td><td style="padding:8px 12px;">${email}</td></tr>` : ''}
          </table>

          <h3 style="color:#1d4ed8;margin-top:20px;">Academic Details</h3>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr style="background:#dbeafe;">
              <td style="font-weight:bold;width:40%;padding:8px 12px;">Stream</td>
              <td style="padding:8px 12px;">${stream}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">Percentage</td>
              <td style="padding:8px 12px;">${percentage}%</td>
            </tr>
            ${entranceExam ? `<tr style="background:#dbeafe;"><td style="font-weight:bold;padding:8px 12px;">Entrance Exam</td><td style="padding:8px 12px;">${entranceExam}</td></tr>` : ''}
            ${examScore ? `<tr><td style="font-weight:bold;padding:8px 12px;">Exam Score / Percentile</td><td style="padding:8px 12px;">${examScore}</td></tr>` : ''}
          </table>

          <h3 style="color:#1d4ed8;margin-top:20px;">Preferences</h3>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
            <tr style="background:#dbeafe;">
              <td style="font-weight:bold;width:40%;padding:8px 12px;">Preferred Course</td>
              <td style="padding:8px 12px;">${course}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;padding:8px 12px;">Budget</td>
              <td style="padding:8px 12px;">${budget}</td>
            </tr>
            <tr style="background:#dbeafe;">
              <td style="font-weight:bold;padding:8px 12px;">Preferred Location</td>
              <td style="padding:8px 12px;">${location}</td>
            </tr>
          </table>

          <h3 style="color:#1d4ed8;margin-top:20px;">Top Matched Colleges</h3>
          <p style="background:#fff;border:1px solid #bfdbfe;border-radius:6px;padding:12px;">${collegeList}</p>

          <p style="color:#6b7280;font-size:12px;margin-top:16px;">Submitted ${timestamp} IST</p>
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
        sender: {
          email: process.env.BREVO_SENDER!,
          name: 'ABS Website',
        },
        to: [{ email: 'bwtnaresh@gmail.com', name: 'Naresh' }],
        subject,
        htmlContent,
        replyTo: email ? { email, name: name.trim() } : undefined,
      }),
    });

    if (!brevoRes.ok) {
      const errorData = await brevoRes.json();
      console.error('Brevo API error:', errorData);
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
