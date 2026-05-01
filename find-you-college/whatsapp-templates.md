# WhatsApp Message Templates — ABS NEET Predictor

## ⚠️ IMPORTANT: Meta WhatsApp Business API Compliance

For **business-initiated messages** to users who have NOT messaged you in the last 24 hours, Meta requires you to use **pre-approved template messages**. Free-form text only works inside the 24-hour customer service window.

**Recommendation for ABS:**
- Submit the templates below to Meta Business Manager → WhatsApp Manager → Message Templates
- Wait for approval (~24-48 hours)
- Once approved, use template name in API calls
- For counselor-side notifications (your own team), free-form text works since they message you first

---

## TEMPLATE 1: Student Results Notification (UTILITY category)

**Template Name:** `abs_predictor_results`
**Language:** English (with Hinglish content)
**Category:** UTILITY

### Body:
```
Hi {{1}}! 🩺

ABS NEET Predictor results aapke liye taiyaar hain:

📊 Match Summary:
✅ Safe: {{2}} colleges
⚡ Moderate: {{3}} colleges
🎯 Reach: {{4}} colleges

🏆 Top Recommendation: {{5}}

📞 ABS counselor aapko jaldi call karega — choice form filling, document verification, aur reporting ka pura process guide karega.

— ABS Educational Solution
www.absadmission.com
```

### Variables:
| Variable | Example | Description |
|---|---|---|
| {{1}} | Rohit | Student first name |
| {{2}} | 4 | Safe college count |
| {{3}} | 6 | Moderate college count |
| {{4}} | 3 | Reach college count |
| {{5}} | GMC Baramati | Top college name |

### Call-to-Action Buttons (optional):
- **Quick Reply:** "Counselor se baat karni hai"
- **URL Button:** "View full list" → `https://absadmission.com/predictor-results/{{leadId}}`

---

## TEMPLATE 2: Welcome / First Touch (MARKETING category)

**Template Name:** `abs_predictor_welcome`
**Language:** English (Hinglish content)
**Category:** MARKETING

### Body:
```
Namaste {{1}} ji! 🙏

Aapne ABS Educational Solution ka NEET College Predictor use kiya — thank you!

Aapka NEET score: {{2}}/720
Course preference: {{3}}

Hamare expert counselor aapko 30 minutes mein call karenge. Tab tak aap apni 12th marksheet, NEET admit card, aur category certificate ready rakhiye.

Koi sawaal? Reply karein.

— Team ABS
ISO Certified · DPIIT Recognized · Est. 2009
```

### Variables:
| Variable | Example |
|---|---|
| {{1}} | Rohit |
| {{2}} | 585 |
| {{3}} | MBBS |

---

## TEMPLATE 3: Document Reminder (UTILITY category)

**Template Name:** `abs_document_reminder`
**Language:** English

### Body:
```
Hi {{1}}, ABS counselor team here.

For your {{2}} admission, please keep these documents ready:

📄 NEET 2024 scorecard
📄 12th marksheet & passing certificate
📄 10th marksheet
📄 Domicile certificate (Maharashtra)
📄 Caste certificate (if applicable)
📄 Aadhaar card
📄 4 passport size photos

Counselling registration: {{3}}
Help: +91 {{4}}

— ABS Educational Solution
```

---

## INTERNAL TEAM NOTIFICATIONS (No template needed — counselors message back so 24-hr window is open)

### Counselor New Lead Alert (free-form text)

```
🔔 NEW LEAD — ABS Predictor

ID: {{leadId}}
Name: {{name}}
Mobile: +91{{mobile}}
Email: {{email}}

📊 Profile:
NEET: {{neet_score}}/720
12th PCB: {{twelfth_pcb}}%
Category: {{category}}
Course: {{course}}
Domicile: {{domicile}}
Regions: {{regions}}

📈 Match counts:
Safe: {{safe_count}} | Moderate: {{moderate_count}} | Reach: {{reach_count}}

🏆 Top 3:
1. {{college_1}}
2. {{college_2}}
3. {{college_3}}

⏰ Action: Call within 30 minutes for best conversion.
🔗 Lead Sheet: {{sheet_link}}
```

---

## API USAGE — Meta Cloud API

### Send Template Message:

```bash
curl -X POST "https://graph.facebook.com/v20.0/PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "919876543210",
    "type": "template",
    "template": {
      "name": "abs_predictor_results",
      "language": { "code": "en" },
      "components": [
        {
          "type": "body",
          "parameters": [
            { "type": "text", "text": "Rohit" },
            { "type": "text", "text": "4" },
            { "type": "text", "text": "6" },
            { "type": "text", "text": "3" },
            { "type": "text", "text": "GMC Baramati" }
          ]
        }
      ]
    }
  }'
```

### Send Free-Form Text (within 24-hr window):

```bash
curl -X POST "https://graph.facebook.com/v20.0/PHONE_NUMBER_ID/messages" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "919876543210",
    "type": "text",
    "text": { "body": "Your detailed message here..." }
  }'
```

---

## ALTERNATIVE PROVIDERS (if Meta direct setup is too complex)

For faster setup with pre-approved templates and dashboard:

### 1. **Interakt** (Made in India, popular for SMBs)
- URL: https://www.interakt.shop
- Pricing: ₹999-2999/month
- Pros: Simple template approval, drag-drop campaign builder
- API: REST endpoint with bearer token

### 2. **AiSensy** (Indian, Mumbai-based)
- URL: https://www.aisensy.com
- Pricing: ₹999-7999/month
- Pros: Bulk campaigns, chatbot builder, agent panel
- API: REST endpoint

### 3. **Wati**
- URL: https://www.wati.io
- Pricing: ₹2399+/month
- Pros: Team inbox, automation, CRM integration
- API: REST endpoint

### 4. **Gallabox** (Indian)
- URL: https://gallabox.com
- Pricing: ₹2495+/month
- Pros: Shared inbox, broadcast, drip campaigns
- API: REST endpoint

**Naresh ji, recommendation:** Aapke pass already Shruti bot setup hai with WhatsApp Business API. Same setup re-use karo — naya provider lene ki zaroorat nahi. Aapke existing token aur phone number ID ko Apps Script / n8n mein paste karo.

---

## TEMPLATE APPROVAL TIPS (avoid rejection)

1. **No promotional language in UTILITY templates** — words like "FREE", "DISCOUNT", "BUY NOW" trigger rejection
2. **Variables must be necessary** — don't add variables just to pass dynamic data; Meta rejects "variable abuse"
3. **No URLs in body unless you add a URL Button** — body URLs cause rejection
4. **Consistent formatting** — emojis OK, but don't overuse
5. **Match the category** — UTILITY = transactional (orders, results, reminders); MARKETING = promotional; AUTHENTICATION = OTP only
6. **Re-submit if rejected** — Meta gives reason, fix it and resubmit; 2nd submission usually approved

---

## RATE LIMITS (Meta Cloud API)

- New WABA accounts: **1,000 conversations/24h** initially
- After verification: **10,000 → 100,000 → unlimited** (tier-based)
- Same number can receive max **1 message every 24 hours** from your business unless they reply

For ABS scale (~50-200 leads/day during admission season), default tier is sufficient.
