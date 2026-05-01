/**
 * ============================================================
 * ABS Educational Solution — Google Apps Script
 * ============================================================
 * Handles leads from:
 *   - /find-your-college  (NEET Predictor)
 *   - /counselling        (Career Counselling Tool)
 *   - /scholarship-tool   (Scholarship Decision Tool)
 *
 * SETUP STEPS (one-time):
 *   1. Go to sheets.google.com → create a new spreadsheet
 *      (name it "ABS Leads" or anything you like)
 *   2. Extensions → Apps Script → paste THIS entire file
 *   3. Click Save, then Deploy → New Deployment
 *      Type: Web App | Execute as: Me | Access: Anyone
 *   4. Authorise when prompted
 *   5. Copy the Web App URL shown after deploying
 *   6. Add it to your Next.js project:
 *        GOOGLE_SCRIPT_URL=<paste URL here>
 *      in your .env.local file
 *
 * Author: Built for Naresh / ABS Educational Solution
 * ============================================================
 */

const NOTIFICATION_EMAIL = 'bwtnaresh@gmail.com';

// ============================================================
// MAIN ENTRY POINT
// ============================================================

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const type = payload.type || 'neet';

    let result;
    if (type === 'counselling') {
      result = handleCounselling(payload);
    } else if (type === 'scholarship') {
      result = handleScholarship(payload);
    } else {
      result = handleNEET(payload);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, ...result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET for health check / CORS preflight
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ABS Apps Script running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// NEET PREDICTOR LEAD
// ============================================================

function handleNEET(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const SHEET = 'NEET Predictor';

  let sheet = ss.getSheetByName(SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET);
    const headers = [
      'Lead ID', 'Timestamp (IST)', 'Name', 'Mobile', 'Email',
      'NEET Score', '12th PCB %', 'Category', 'Course',
      'Regions', 'Domicile', 'Eligible',
      'Safe', 'Moderate', 'Reach',
      'Top Colleges (up to 10)',
      'Status', 'Notes'
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#065f46')
      .setFontColor('#ffffff');
    sheet.setColumnWidth(1, 120);
    sheet.setColumnWidth(16, 350);
  }

  const id = 'NEET-' + new Date().getTime().toString().slice(-8);
  const topColleges = Array.isArray(payload.topColleges)
    ? payload.topColleges.slice(0, 10).join(' | ')
    : '';

  sheet.appendRow([
    id,
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    payload.name || '',
    "'" + (payload.mobile || payload.phone || ''),   // leading apostrophe keeps it as text
    payload.email || '',
    payload.neetScore || '',
    payload.twelfthPCB || '',
    payload.category || '',
    payload.course || '',
    Array.isArray(payload.regions) ? payload.regions.join(', ') : (payload.regions || ''),
    payload.domicile || '',
    payload.eligible ? 'Yes' : 'No',
    payload.safeCount || '',
    payload.moderateCount || '',
    payload.reachCount || '',
    topColleges,
    'New',
    ''
  ]);

  // Email notification to Naresh
  try {
    const subject = `🎓 NEET Lead [${id}] — ${payload.name} | NEET ${payload.neetScore} | ${payload.course}`;
    const body = `New NEET Predictor lead received.\n\n`
      + `Lead ID: ${id}\n`
      + `Name: ${payload.name}\n`
      + `Mobile: ${payload.mobile || payload.phone}\n`
      + `Email: ${payload.email || '—'}\n\n`
      + `NEET Score: ${payload.neetScore}\n`
      + `12th PCB: ${payload.twelfthPCB}%\n`
      + `Category: ${payload.category}\n`
      + `Course: ${payload.course}\n`
      + `Regions: ${Array.isArray(payload.regions) ? payload.regions.join(', ') : payload.regions}\n`
      + `Domicile: ${payload.domicile}\n`
      + `Eligible: ${payload.eligible ? 'Yes' : 'No'}\n\n`
      + `Safe: ${payload.safeCount || 0}  Moderate: ${payload.moderateCount || 0}  Reach: ${payload.reachCount || 0}\n\n`
      + `Top Colleges:\n${topColleges.replace(/ \| /g, '\n')}\n\n`
      + `View sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

    MailApp.sendEmail({ to: NOTIFICATION_EMAIL, subject, body });
  } catch (mailErr) {
    Logger.log('Mail error: ' + mailErr.toString());
  }

  return { leadId: id };
}

// ============================================================
// CAREER COUNSELLING LEAD
// ============================================================

function handleCounselling(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const SHEET = 'Counselling';

  let sheet = ss.getSheetByName(SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET);
    const headers = [
      'Lead ID', 'Timestamp (IST)', 'Name', 'Phone', 'Email', 'Pincode',
      'Course Interest',
      'Stream', '12th %', 'Entrance Exam', 'Exam Score',
      'Subjects', 'Career Goals', 'Work Style',
      'Course Duration Pref', 'Budget', 'Location Pref',
      'Status', 'Notes'
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#1d4ed8')
      .setFontColor('#ffffff');
    sheet.setColumnWidth(1, 120);
  }

  const id = 'COUN-' + new Date().getTime().toString().slice(-8);
  const ans = payload.answers || {};

  sheet.appendRow([
    id,
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    payload.name || '',
    "'" + (payload.phone || ''),
    payload.email || '',
    payload.pin || '',
    payload.course || '',
    ans.stream || '',
    ans.percentage || '',
    ans.entrance || '',
    ans.examScore || '',
    Array.isArray(ans.subjects) ? ans.subjects.join(', ') : (ans.subjects || ''),
    Array.isArray(ans.goals) ? ans.goals.join(', ') : (ans.goals || ''),
    ans.environment || '',
    ans.duration || '',
    ans.budget || '',
    ans.location || '',
    'New',
    ''
  ]);

  // Email notification to Naresh
  try {
    const answerLines = Object.entries(ans)
      .map(([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
      .join('\n');

    const subject = `🎓 Counselling Lead [${id}] — ${payload.name} | ${payload.course}`;
    const body = `New Career Counselling lead received.\n\n`
      + `Lead ID: ${id}\n`
      + `Name: ${payload.name}\n`
      + `Phone: ${payload.phone}\n`
      + `Email: ${payload.email || '—'}\n`
      + `Pincode: ${payload.pin || '—'}\n`
      + `Course Interest: ${payload.course}\n\n`
      + `Questionnaire Answers:\n${answerLines}\n\n`
      + `View sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

    MailApp.sendEmail({ to: NOTIFICATION_EMAIL, subject, body });
  } catch (mailErr) {
    Logger.log('Mail error: ' + mailErr.toString());
  }

  return { leadId: id };
}

// ============================================================
// SCHOLARSHIP DECISION TOOL LEAD
// ============================================================

function handleScholarship(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const SHEET = 'Scholarship';

  let sheet = ss.getSheetByName(SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET);
    const headers = [
      'Lead ID', 'Timestamp (IST)', 'Name', 'Phone', 'Email',
      'Interested Course', 'Scholarship', 'Scheme Reference',
      'Caste Category', 'Family Income',
      'Status', 'Notes'
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#047857')
      .setFontColor('#ffffff');
    sheet.setColumnWidth(1, 120);
    sheet.setColumnWidth(7, 280);
  }

  const id = 'SCH-' + new Date().getTime().toString().slice(-8);

  sheet.appendRow([
    id,
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    payload.name || '',
    "'" + (payload.phone || ''),
    payload.email || '',
    payload.course || '',
    payload.scheme || '',
    payload.schemeRef || '',
    payload.category || '',
    payload.income || '',
    'New',
    ''
  ]);

  // Email notification to Naresh
  try {
    const subject = `🎓 Scholarship Lead [${id}] — ${payload.name} | ${payload.scheme}`;
    const body = `New Scholarship Decision Tool lead received.\n\n`
      + `Lead ID: ${id}\n`
      + `Name: ${payload.name}\n`
      + `Phone: ${payload.phone}\n`
      + `Email: ${payload.email || '—'}\n\n`
      + `Interested Course: ${payload.course}\n`
      + `Scholarship: ${payload.scheme}\n`
      + `Scheme Reference: ${payload.schemeRef || '—'}\n`
      + `Caste Category: ${payload.category || '—'}\n`
      + `Family Income: ${payload.income || '—'}\n\n`
      + `View sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

    MailApp.sendEmail({ to: NOTIFICATION_EMAIL, subject, body });
  } catch (mailErr) {
    Logger.log('Mail error: ' + mailErr.toString());
  }

  return { leadId: id };
}

// ============================================================
// TEST — run from Apps Script editor to verify setup
// ============================================================

function testNEET() {
  const fake = {
    type: 'neet',
    name: 'Test Student',
    mobile: '9876543210',
    email: 'test@example.com',
    neetScore: 585,
    twelfthPCB: 78.5,
    category: 'Open',
    course: 'MBBS',
    regions: ['Konkan', 'Western Maharashtra'],
    domicile: 'Maharashtra',
    eligible: true,
    safeCount: 4,
    moderateCount: 6,
    reachCount: 3,
    topColleges: ['GMC Baramati', 'GMC Alibag', 'GMC Nashik'],
  };
  Logger.log(JSON.stringify(handleNEET(fake)));
}

function testCounselling() {
  const fake = {
    type: 'counselling',
    name: 'Test Student',
    phone: '9876543210',
    email: 'test@example.com',
    pin: '400001',
    course: 'Engineering',
    answers: {
      stream: 'Science (PCM)',
      percentage: '85',
      entrance: 'JEE',
      examScore: '72 percentile',
      subjects: ['Mathematics', 'Physics'],
      goals: ['High salary', 'Job security'],
      environment: 'Office / Lab',
      duration: '4 years',
      budget: '5-10 Lakh total',
      location: 'Mumbai',
    },
  };
  Logger.log(JSON.stringify(handleCounselling(fake)));
}

function testScholarship() {
  const fake = {
    type: 'scholarship',
    name: 'Test Student',
    phone: '9876543210',
    email: 'test@example.com',
    course: 'B.E. / B.Tech',
    scheme: 'GOI Post-Matric Scholarship (SC)',
    schemeRef: 'Chapter 3.2',
    category: 'SC',
    income: '≤ ₹1 lakh',
  };
  Logger.log(JSON.stringify(handleScholarship(fake)));
}
