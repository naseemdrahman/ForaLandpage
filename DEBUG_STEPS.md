# Debug Steps for "Failed to connect" Error

## Step 1: Check Browser Console
1. Open your browser DevTools (F12 or Cmd+Option+I)
2. Go to the **Console** tab
3. Try submitting the form
4. Look for any red error messages
5. **Share what errors you see** - this will help identify the issue

## Step 2: Check Network Tab
1. In DevTools, go to the **Network** tab
2. Try submitting the form
3. Look for a request to `script.google.com`
4. Click on it to see:
   - Request URL
   - Request Method (should be POST)
   - Request Payload
   - Response Status
   - Response Body
5. **Share what you see** - especially the response status and body

## Step 3: Verify Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. Click **View** → **Executions**
4. Try submitting the form again
5. Check if there's a new execution with any errors
6. **Share any error messages** you see

## Step 4: Test Apps Script Directly
Try this command in your terminal (replace with your actual URL):
```bash
curl -X POST "https://script.google.com/a/macros/fora.llc/s/AKfycbwjRmdtcUFpIJIZwaz0LampkismCG7wB_hX5_tAVHsdH-0-JIZMS2Hi1HJQUHYImytOaw/exec" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","source":"waitlist-modal"}'
```

If this works, you should see: `{"ok":true}`
If it doesn't work, you'll see an error message.

## Step 5: Check Environment Variable
1. In your browser console, type:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_WAITLIST_SCRIPT_URL)
   ```
2. This should show your Apps Script URL
3. If it shows `undefined`, the environment variable isn't loading

## Common Issues:

1. **Server not restarted** - After updating .env.local, you MUST restart the dev server
2. **CORS error** - Apps Script might need "Anyone" access (not "Anyone within Fora")
3. **Script not deployed** - Make sure you clicked "Deploy" after saving
4. **Wrong sheet tab names** - Must be exactly "Waitlist" and "Contact Us"
5. **Script error** - Check the execution log in Apps Script
