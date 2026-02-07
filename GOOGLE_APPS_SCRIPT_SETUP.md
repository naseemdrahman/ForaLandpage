# Google Apps Script Setup Guide

This is a simpler way to save form submissions to Google Sheets - no service account needed!

## Step 1: Create the Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with this:

### For Waitlist Form:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, source, ua } = data;

    // Validate
    if (!name || !email) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Name and email are required" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Open your spreadsheet (replace with your spreadsheet ID)
    const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Waitlist");

    // Check if email already exists
    const emailColumn = sheet.getRange("C:C").getValues().flat();
    const emailExists = emailColumn.some(
      (existingEmail) => existingEmail.toString().toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Email already registered" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Add timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });

    // Append row: [Timestamp, Name, Email]
    sheet.appendRow([timestamp, name, email]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### For Contact Form:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, message, source, ua } = data;

    // Validate
    if (!name || !email) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Name and email are required" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Open your spreadsheet (replace with your spreadsheet ID)
    const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Contact Us");

    // Add timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });

    // Append row: [Timestamp, Name, Email, Message]
    sheet.appendRow([timestamp, name, email, message || ""]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 2: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Select type"
3. Choose "Web app"
4. Set:
   - **Description**: "Waitlist Form Handler" (or "Contact Form Handler")
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click "Deploy"
6. **Copy the Web App URL** - you'll need this!

## Step 3: Update Your Environment Variables

Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_WAITLIST_SCRIPT_URL=https://script.google.com/macros/s/YOUR_WAITLIST_SCRIPT_ID/exec
NEXT_PUBLIC_CONTACT_SCRIPT_URL=https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec
```

**Important**: 
- Use the URL from Step 2
- The URL must start with `https://script.google.com/macros/s/`
- Replace `YOUR_WAITLIST_SCRIPT_ID` and `YOUR_CONTACT_SCRIPT_ID` with the actual IDs from your deployed scripts

## Step 4: Update Your Spreadsheet

Make sure your Google Sheet has:
- A tab named **"Waitlist"** with columns: Timestamp | Name | Email
- A tab named **"Contact Us"** with columns: Timestamp | Name | Email | Message

## Step 5: Test It!

1. Restart your dev server: `npm run dev`
2. Fill out the "Join Waitlist" form
3. Check your Google Sheet - the data should appear immediately!

## Troubleshooting

### "Configuration error"
- Make sure `NEXT_PUBLIC_WAITLIST_SCRIPT_URL` and `NEXT_PUBLIC_CONTACT_SCRIPT_URL` are set in `.env.local`
- Restart your dev server after adding them

### "Email already registered"
- This is working correctly! The script prevents duplicate emails.

### Data not appearing in sheet
- Check that the sheet tab names match exactly: "Waitlist" and "Contact Us"
- Make sure the spreadsheet ID in the script matches your actual spreadsheet
- Check the Apps Script execution log for errors

### Request timeout
- The form will timeout after 8 seconds if the script doesn't respond
- Check your Apps Script for errors
- Make sure the script is deployed and accessible

## Benefits of This Approach

✅ No service account credentials needed  
✅ Simpler setup  
✅ Works immediately  
✅ No API quotas to worry about  
✅ Easy to debug (check Apps Script execution log)
