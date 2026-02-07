# Combined Apps Script for Both Forms

Since you're using the same script URL for both Waitlist and Contact, your Apps Script needs to handle both. Here's the combined code:

```javascript
const SPREADSHEET_ID = "1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo";
const WAITLIST_SHEET = "Waitlist";
const CONTACT_SHEET = "Contact Us"; // <-- change if your tab name has NO space

function doPost(e) {
  try {
    const raw = e?.postData?.contents;
    if (!raw) return json({ ok: false, error: "Missing request body" });

    const data = JSON.parse(raw);
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const message = String(data.message || "").trim();
    const source = String(data.source || "").trim().toLowerCase();
    const ua = String(data.ua || "").trim();

    if (!email) return json({ ok: false, error: "Email is required" });

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (source.includes("waitlist")) {
      const sheet = ss.getSheetByName(WAITLIST_SHEET);
      if (!sheet) return json({ ok: false, error: `Waitlist sheet not found: ${WAITLIST_SHEET}` });

      // dedupe: email column C
      const lastRow = sheet.getLastRow();
      const emails = lastRow > 1 ? sheet.getRange(2, 3, lastRow - 1, 1).getValues().flat() : [];
      const exists = emails.some(v => String(v).trim().toLowerCase() === email);

      if (exists) return json({ ok: true, deduped: true });

      sheet.appendRow([new Date(), name, email, source, ua]);

      // send waitlist email
      sendWaitlistConfirmation(name, email);
      return json({ ok: true, emailed: true });
    }

    if (source.includes("contact")) {
      const sheet = ss.getSheetByName(CONTACT_SHEET);
      if (!sheet) return json({ ok: false, error: `Contact sheet not found: ${CONTACT_SHEET}` });

      sheet.appendRow([new Date(), name, email, message, source, ua]);

      // confirmation email for contact
      sendContactConfirmation(name, email);

      return json({ ok: true, emailed: true });
    }

    return json({ ok: false, error: `Invalid source: ${source}` });

  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendWaitlistConfirmation(name, email) {
  const subject = "Welcome to FORA! You're on the waitlist";
  const htmlBody =
    `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align:center; padding: 12px 0;">
        <h1 style="margin:0;">FORA</h1>
      </div>
      <div style="background:#f6f6f6; border-radius:12px; padding:24px;">
        <h2 style="margin-top:0;">Hey ${name || "there"} 👋</h2>
        <p>Thanks for joining the waitlist. We'll email you when early access opens.</p>
      </div>
      <p style="color:#999; font-size:12px; text-align:center; margin-top:16px;">
        © ${new Date().getFullYear()} FORA
      </p>
    </div>`;

  MailApp.sendEmail({ to: email, subject, htmlBody });
}

function sendContactConfirmation(name, email) {
  const subject = "We got your message - FORA";
  const htmlBody =
    `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align:center; padding: 12px 0;">
        <h1 style="margin:0;">FORA</h1>
      </div>
      <div style="background:#f6f6f6; border-radius:12px; padding:24px;">
        <h2 style="margin-top:0;">Thanks for reaching out${name ? `, ${name}` : ""}.</h2>
        <p>We received your message and will respond soon.</p>
      </div>
      <p style="color:#999; font-size:12px; text-align:center; margin-top:16px;">
        © ${new Date().getFullYear()} FORA
      </p>
    </div>`;

  MailApp.sendEmail({ to: email, subject, htmlBody });
}
```

## Steps to Deploy

1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. **Select ALL the code** (Ctrl+A / Cmd+A) and **DELETE it**
4. **Paste the entire code above** (everything between the ```javascript and ``` markers)
5. **IMPORTANT**: Verify the `CONTACT_SHEET` name matches your actual Google Sheet tab name (with or without a space)
6. Click **Save** (Ctrl+S / Cmd+S)
7. **Deploy** → **Manage deployments** → Click the **pencil icon** → Set version to **New version** → Click **Deploy**
8. **CRITICAL**: When prompted, click **Authorize access** → Select your Google account → Click **Allow**
   - You MUST authorize Gmail/Mail permissions for emails to work
   - If you see "This app isn't verified", click **Advanced** → **Go to [project name] (unsafe)** → **Allow**
