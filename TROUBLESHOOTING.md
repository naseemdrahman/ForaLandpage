# Troubleshooting Form Submissions

## Quick Checks

### 1. Restart Your Dev Server
After updating `.env.local`, you MUST restart:
```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### 2. Check Browser Console
Open browser DevTools (F12 or Cmd+Option+I) and check the Console tab for errors when you submit the form.

### 3. Verify Apps Script Setup

Your Apps Script needs to:
- ✅ Have the correct code (see `GOOGLE_APPS_SCRIPT_SETUP.md`)
- ✅ Be deployed as a **Web App** (not Library)
- ✅ Have "Who has access" set to **"Anyone"** (or "Anyone within Fora" for workspace)
- ✅ Have the correct spreadsheet ID in the code
- ✅ Have the correct sheet tab name ("Waitlist" or "Contact Us")

### 4. Test the Apps Script Directly

You can test your Apps Script URL directly in a browser or with curl:

```bash
curl -X POST "YOUR_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","source":"waitlist-modal"}'
```

If it works, you should get: `{"ok":true}`

### 5. Common Issues

**"Failed to connect" error:**
- Environment variable not set in `.env.local`
- Server not restarted after adding env variable
- Apps Script URL is incorrect
- Apps Script not deployed as Web App
- CORS issue (check browser console)

**"Configuration error" message:**
- Environment variable name is wrong
- Environment variable not set at all

**"Email already registered":**
- This is working! The script is preventing duplicates.

**Data not appearing in sheet:**
- Check Apps Script execution log (View → Executions)
- Verify spreadsheet ID in script matches your sheet
- Verify sheet tab names match exactly ("Waitlist", "Contact Us")
- Check that script has permission to edit the sheet

## Debug Steps

1. **Check environment variables are loaded:**
   - Add a console.log in your code to see if the URL is set
   - Or check in browser: `console.log(process.env.NEXT_PUBLIC_WAITLIST_SCRIPT_URL)`

2. **Check Apps Script logs:**
   - Go to script.google.com
   - Open your script
   - View → Executions
   - See if there are any errors

3. **Test Apps Script manually:**
   - Use the curl command above
   - Or use Postman/Insomnia to POST to the URL

4. **Check browser network tab:**
   - Open DevTools → Network tab
   - Submit the form
   - Look for the POST request to your Apps Script URL
   - Check the response status and body
