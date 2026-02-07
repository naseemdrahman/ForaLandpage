# Fix Apps Script "Page Not Found" Error

The script is returning "Page Not Found" which means the deployment isn't accessible. Here's how to fix it:

## Step 1: Check Deployment Settings

1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. Click **Deploy** → **Manage deployments**
4. Click the **pencil icon** (Edit) on your deployment
5. Check these settings:

### Critical Settings:
- **Execute as:** Should be "Me (your-email@fora.llc)"
- **Who has access:** This is the problem! It should be:
  - ✅ **"Anyone"** (if available)
  - OR
  - ✅ **"Anyone with the link"** 
  - ❌ NOT "Anyone within Fora" (this restricts access)

## Step 2: Update Access Settings

If "Who has access" is set to "Anyone within Fora":
1. Click the dropdown
2. Change it to **"Anyone"** (if the option exists)
3. If "Anyone" isn't available, you may need to:
   - Deploy as a new deployment
   - Or check your Google Workspace admin settings

## Step 3: Redeploy

1. After changing the access setting, click **Deploy**
2. Copy the NEW Web App URL (it might be the same or different)
3. Update your `.env.local` with the new URL if it changed

## Step 4: Test Again

After redeploying, test with:
```bash
curl -X POST "YOUR_NEW_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","source":"waitlist-modal"}'
```

You should get: `{"ok":true}` instead of "Page Not Found"

## Alternative: Use Regular Google Account Script

If workspace restrictions are blocking you:
1. Create a NEW script using a regular Google account (not workspace)
2. Deploy it with "Anyone" access
3. Use that URL instead

## Common Issues:

- **"Anyone within Fora"** - Too restrictive, blocks external requests
- **Script not saved** - Make sure you saved before deploying
- **Old deployment** - Make sure you're editing the active deployment
