# Google Sheets Integration Verification

## Quick Test

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Test the connection:**
   Visit: `http://localhost:3000/api/verify-sheets`
   
   This will test both Waitlist and Contact Us sheets and show you:
   - ✅ If credentials are configured
   - ✅ If sheets are accessible
   - ✅ If data can be written successfully

3. **Test the forms:**
   - Fill out the "Join Waitlist" form → Should save to `Waitlist` tab
   - Fill out the "Contact us" form → Should save to `Contact Us` tab

## What Gets Saved Where

### Waitlist Form
- **Sheet Tab:** `Waitlist`
- **Columns:** Timestamp | Name | Email
- **Location:** Column A = Timestamp, Column B = Name, Column C = Email

### Contact Us Form
- **Sheet Tab:** `Contact Us`
- **Columns:** Timestamp | Name | Email | Message
- **Location:** Column A = Timestamp, Column B = Name, Column C = Email, Column D = Message

## Environment Variables Required

Make sure your `.env.local` file has:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_WAITLIST_SHEET_ID=your-waitlist-sheet-id
GOOGLE_CONTACT_SHEET_ID=your-contact-sheet-id
```

## Troubleshooting

### Forms not saving?
1. Check `/api/verify-sheets` endpoint
2. Check browser console for errors
3. Check server logs (terminal where `npm run dev` is running)
4. Verify sheet tab names match exactly: `Waitlist` and `Contact Us`

### "Email already registered" error?
- This is normal if someone tries to join the waitlist twice
- The system checks for duplicate emails in the Waitlist sheet

### Data not appearing in sheets?
- Make sure the service account has edit access to the spreadsheet
- Check that the sheet tab names match exactly (case-sensitive)
- Verify the spreadsheet IDs are correct

## How It Works

1. User fills out form → Frontend sends POST request to `/api/waitlist` or `/api/contact`
2. API validates the data → Checks email format, required fields
3. API connects to Google Sheets → Uses service account credentials
4. API writes to sheet → Appends new row with timestamp
5. API returns success → User sees confirmation message

The system includes:
- ✅ Retry logic (3 attempts with exponential backoff)
- ✅ Error handling and logging
- ✅ Duplicate email detection (waitlist only)
- ✅ Fallback to local storage if Google Sheets fails (waitlist only)
