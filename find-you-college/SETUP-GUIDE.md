# ABS NEET Predictor — Production Deployment Guide

**Built for:** Naresh / ABS Educational Solution
**Tech stack:** React (frontend) + Google Apps Script OR n8n (backend) + Google Sheets (data) + WhatsApp Business API + Gmail

This guide walks you through deploying the complete production system from zero to live in **45-90 minutes**.

---

## 📦 What You Get

| File | Purpose |
|---|---|
| `abs-neet-predictor.jsx` | React frontend (predictor tool) |
| `apps-script-backend.gs` | Google Apps Script backend (lightweight, no server needed) |
| `n8n-workflow.json` | n8n workflow alternative (more powerful, needs n8n instance) |
| `colleges_master.csv` | College database (61 colleges) — import to Google Sheet |
| `cutoffs_2024.csv` | Cutoff data (610 rows: 61 colleges × 10 categories) |
| `whatsapp-templates.md` | Meta-approved WhatsApp message templates |
| `email-template.html` | Standalone HTML email template |
| `SETUP-GUIDE.md` | This document |

---

## 🚀 PATH A — SIMPLE SETUP (Recommended for fast launch)

**Backend:** Google Apps Script (free, serverless, no n8n needed)
**Time:** 30-45 minutes

### Step 1: Create Google Sheet (5 min)

1. Go to https://sheets.google.com → New Blank Sheet
2. Rename: **"ABS NEET Predictor — Production"**
3. Create 4 tabs at the bottom:
   - `Leads` (auto-populated by webhook — leave empty)
   - `Colleges_Master`
   - `Cutoffs_2024`
   - `Eligibility_Rules`

4. **Import Colleges_Master:**
   - Select `Colleges_Master` tab → File → Import → Upload `colleges_master.csv` → Replace current sheet
   
5. **Import Cutoffs_2024:**
   - Select `Cutoffs_2024` tab → File → Import → Upload `cutoffs_2024.csv` → Replace current sheet

6. **Eligibility_Rules** (manually fill):
   ```
   course      category  neet_min  pcb_min
   MBBS        Open      164       50
   MBBS        OBC       129       40
   MBBS        SC        129       40
   MBBS        ST        129       40
   MBBS        EWS       164       50
   ... (repeat for BDS, BAMS, BHMS, BUMS, BPT)
   ```

7. **Copy the Sheet ID** from URL (the long string between `/d/` and `/edit`):
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
   Save this — you'll need it later.

### Step 2: Set up Apps Script Backend (10 min)

1. From the Sheet, click **Extensions → Apps Script**
2. Delete the default code
3. Paste entire contents of `apps-script-backend.gs`
4. Update the `CONFIG` object at the top:
   ```js
   const CONFIG = {
     WHATSAPP_API_URL: 'https://graph.facebook.com/v20.0/YOUR-PHONE-NUMBER-ID/messages',
     WHATSAPP_TOKEN: 'EAAxxxxxxxxxxxx', // your Meta access token
     COUNSELOR_WHATSAPP: ['919876543210', '918765432109'],
     COUNSELOR_EMAIL: 'admissions@absadmission.com',
     FROM_NAME: 'ABS Educational Solution',
     REPLY_TO: 'admissions@absadmission.com',
     ...
   };
   ```
5. **Save** (Ctrl+S) → Name the project: "ABS Predictor Backend"
6. **Test** the script:
   - In the function dropdown, select `setupSheet` → click ▶ Run
   - Authorize when prompted (allow Google to send emails/access sheets)
   - Then run `testWebhook` to verify everything works

### Step 3: Deploy as Web App (5 min)

1. Click **Deploy → New deployment**
2. Click ⚙ icon → select **Web app**
3. Settings:
   - **Description:** ABS Predictor v1
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy** → Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfy...../exec`)
5. **Save this URL** — this is your `WEBHOOK_URL`

### Step 4: WhatsApp Business API Setup (15 min)

You already have this set up for Shruti bot — re-use those credentials. If starting fresh:

1. Go to https://developers.facebook.com → My Apps → Create App → Business
2. Add **WhatsApp** product
3. Go to **API Setup** page:
   - Note your **Phone Number ID** (e.g., `123456789012345`)
   - Generate a **Permanent Access Token** (System User token recommended)
4. Update your Apps Script `CONFIG` with these values

5. **Submit Templates for Approval:**
   - Go to **Message Templates** → Create Template
   - Use templates from `whatsapp-templates.md`
   - Submit `abs_predictor_results` first (UTILITY category)
   - Wait 24-48 hours for approval
   - **In the meantime:** the backend will fall back to free-form text (works only if user messages you first)

### Step 5: Deploy React Frontend (10 min)

You have multiple options — pick one:

#### Option A: Deploy on Vercel (easiest, free)
1. Create account at https://vercel.com
2. Click "Add New Project" → "Import"
3. Push `abs-neet-predictor.jsx` to a GitHub repo (with a basic Vite/Next.js setup)
4. Vercel auto-deploys
5. Custom domain: `predictor.absadmission.com` (point CNAME to Vercel)

#### Option B: Embed in absadmission.com (WordPress / static site)
1. Build the React app: `npm run build`
2. Upload `dist/` folder to your web hosting
3. Add `<script>` tag or iframe on absadmission.com page

#### Option C: Quick Test (Codepen / CodeSandbox)
1. Go to https://codesandbox.io → React template
2. Paste `abs-neet-predictor.jsx` content into `App.jsx`
3. Add tailwind via CDN in `index.html`
4. Share the live URL with team for testing

#### Option D: Use the artifact directly
The React tool is also available as a Claude Artifact — share the artifact URL with Naresh's team directly for instant testing.

### Step 6: Connect Frontend to Backend (2 min)

1. Open `abs-neet-predictor.jsx`
2. Find this line at the top:
   ```js
   const WEBHOOK_URL = "https://YOUR-N8N-DOMAIN.com/webhook/abs-neet-predictor";
   ```
3. Replace with your **Apps Script Web App URL** from Step 3:
   ```js
   const WEBHOOK_URL = "https://script.google.com/macros/s/AKfy...../exec";
   ```
4. Re-deploy the frontend

### Step 7: End-to-End Test (5 min)

1. Open the deployed predictor URL on your phone
2. Fill in test data: 
   - Name: Test Student
   - Mobile: your number
   - NEET score: 585
   - 12th PCB: 78
   - Category: Open
   - Course: MBBS
   - Region: Konkan
3. Submit → check:
   - ✅ Results page shows colleges (Safe/Moderate/Reach tabs)
   - ✅ Lead appears in Google Sheet `Leads` tab
   - ✅ WhatsApp received on test mobile (if template approved)
   - ✅ Email received (if email entered)
   - ✅ Counselor WhatsApp received notification

If anything fails, check **Apps Script → Executions** for error logs.

---

## 🚀 PATH B — ADVANCED SETUP (n8n)

**Use this if:** You want more control, additional integrations (Slack, CRM, Notion), or already run n8n.

### Step 1: Install n8n
- Self-hosted: `npx n8n` or Docker
- Cloud: https://n8n.cloud (₹2000-4000/mo)

### Step 2: Import Workflow
1. n8n dashboard → Workflows → Import
2. Upload `n8n-workflow.json`
3. Click "Import from File"

### Step 3: Configure Credentials
For each node, click and add credentials:
- **Google Sheets:** OAuth2 (sign in with Google)
- **Gmail:** OAuth2 (sign in with Google)
- **WhatsApp HTTP node:** Replace `YOUR_PHONE_NUMBER_ID` and add bearer token

### Step 4: Activate Workflow
1. Click toggle "Active" (top right)
2. Copy the production webhook URL from the Webhook node
3. Paste into React tool's `WEBHOOK_URL`

### Step 5: Test (same as Path A, Step 7)

---

## 🛠️ MAINTENANCE & SCALING

### Updating Cutoff Data Annually

Every August (after CET Cell publishes new cutoffs):
1. Download official PDF from https://medical2024.mahacet.org
2. Use Python + `pdfplumber` to extract per-college closing marks
3. Update `Cutoffs_2024` sheet (rename to `Cutoffs_2025` etc.)
4. Edit React tool's embedded `COLLEGES` data OR
5. Modify React tool to fetch live from Sheets via Apps Script GET endpoint (recommended — see "API Endpoint" section below)

### Adding More Colleges

To expand coverage from 61 → all 330+ Maharashtra medical colleges:
1. Parse the State CET Cell's complete PDF
2. Append rows to `colleges_master.csv` and `cutoffs_2024.csv`
3. Re-import to Google Sheet
4. Update React tool's embedded data

### Scaling to Other States

Phase 2 — replicate this exact system for Karnataka, UP, Delhi, etc.:
- Download each state's cutoff PDFs
- Add `state` column to colleges sheet
- Update predictor logic to filter by state
- Each state takes ~1 week to onboard

---

## 📊 OPTIONAL: API ENDPOINT (Pull Cutoffs Live from Sheets)

Currently the React tool has cutoffs hardcoded for performance. To make it **fully dynamic** (no rebuild needed when you update sheets):

Add this to your `apps-script-backend.gs`:

```js
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'colleges') {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const masterSheet = ss.getSheetByName('Colleges_Master');
    const cutoffsSheet = ss.getSheetByName('Cutoffs_2024');
    
    const masterData = masterSheet.getDataRange().getValues();
    const cutoffsData = cutoffsSheet.getDataRange().getValues();
    
    const masterHeaders = masterData[0];
    const cutoffsHeaders = cutoffsData[0];
    
    const colleges = masterData.slice(1).map(row => {
      const obj = {};
      masterHeaders.forEach((h, i) => obj[h] = row[i]);
      
      const cuts = {};
      cutoffsData.slice(1)
        .filter(c => c[0] === obj.college_id)
        .forEach(c => cuts[c[5]] = c[6]);
      obj.cutoffs = cuts;
      
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify({ colleges }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput('OK');
}
```

Then in React, replace the hardcoded `COLLEGES` array with:
```js
const [colleges, setColleges] = useState([]);
useEffect(() => {
  fetch(WEBHOOK_URL + '?action=colleges')
    .then(r => r.json())
    .then(d => setColleges(d.colleges));
}, []);
```

Now you can update cutoffs in the Google Sheet and changes reflect instantly without redeploying.

---

## 🎯 SUCCESS METRICS TO TRACK

Add these formulas in a `Dashboard` sheet tab:

| Metric | Formula |
|---|---|
| Total leads | `=COUNTA(Leads!A:A)-1` |
| Conversion rate (need manual update) | Status column = "Converted" / Total |
| Avg NEET score | `=AVERAGE(Leads!F:F)` |
| Top course | `=INDEX(Leads!I:I, MATCH(MAX(COUNTIF(...)), ..., 0))` |
| Daily lead count | Group by date |

Use Google Sheets charts for visualization.

---

## 🔐 SECURITY CHECKLIST

- [ ] Apps Script Web App access set to "Anyone" (required for public form) — but logs all submissions
- [ ] WhatsApp Token stored as Apps Script property, not hardcoded (use `PropertiesService.getScriptProperties()`)
- [ ] Add basic rate-limiting in Apps Script: max 5 submissions per mobile number per day
- [ ] Validate mobile/email server-side too (don't rely only on frontend validation)
- [ ] Add CAPTCHA (Cloudflare Turnstile, free) on production form to prevent spam
- [ ] Enable Google Sheets "view history" to track changes
- [ ] Backup the sheet weekly (use Google Drive's auto-backup or Apps Script time-triggered export)

---

## 🐛 COMMON ISSUES & FIXES

| Problem | Fix |
|---|---|
| "Authorization required" on Apps Script | Re-run a function manually to re-authorize |
| WhatsApp not sending | Check token validity (24-hr session tokens expire) |
| Sheet not updating | Check Apps Script execution logs (Extensions → Apps Script → Executions) |
| CORS error in browser | Apps Script `doPost` automatically handles CORS — no fix needed |
| Email going to spam | Set up SPF/DKIM for absadmission.com domain |
| Frontend not connecting | Check `WEBHOOK_URL` matches Apps Script deployment URL exactly |

---

## 💰 COST SUMMARY

| Service | Free Tier | Paid (if scaling) |
|---|---|---|
| Google Sheets | ✅ Unlimited | — |
| Apps Script | ✅ 6 min/exec, 90 min/day | Workspace: included |
| Gmail | ✅ 100 emails/day | Workspace: 1500/day |
| WhatsApp Business API | ✅ 1000 conversations/24h initially | Per-conversation pricing (~₹0.25-1) |
| n8n (Path B only) | Self-hosted: free | Cloud: ₹2-4k/mo |
| Vercel (frontend) | ✅ Free tier sufficient | Pro: ₹1500/mo |

**Total monthly cost for ABS scale (~3000 leads/month):** ₹0 - 5000

---

## 📞 NEXT STEPS

1. ✅ Test end-to-end with team (1 day)
2. ✅ Run a soft launch — share with 50 students from existing ABS database, get feedback
3. ✅ Submit WhatsApp templates for approval (parallel)
4. ✅ Add Cloudflare Turnstile for spam prevention
5. ✅ Run paid Meta Ads campaign pointing to predictor URL (use existing ad account `act_932491719453777`)
6. ✅ Track conversion: Predictor lead → counselor call → admission
7. ✅ Phase 2: Add Karnataka data, then UP, Delhi, Punjab

---

**Built with care for Naresh & team. Any questions, just ask!** 🚀
