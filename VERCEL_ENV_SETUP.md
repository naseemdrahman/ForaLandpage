# Setting Up Environment Variables in Vercel

Your forms need the Google Apps Script URLs to work in production. Here's how to add them:

## Step 1: Get Your Apps Script URLs

Make sure you have:
1. Created your Google Apps Scripts (one for Waitlist, one for Contact)
2. Deployed them as Web Apps
3. Copied the Web App URLs

The URLs should look like:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 2: Add Environment Variables in Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Select your **ForaLandpage** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

### For Waitlist:
- **Name:** `NEXT_PUBLIC_WAITLIST_SCRIPT_URL`
- **Value:** `https://script.google.com/macros/s/YOUR_WAITLIST_SCRIPT_ID/exec`
- **Environment:** Select all (Production, Preview, Development)

### For Contact:
- **Name:** `NEXT_PUBLIC_CONTACT_SCRIPT_URL`
- **Value:** `https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec`
- **Environment:** Select all (Production, Preview, Development)

## Step 3: Redeploy

After adding the environment variables:
1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

## Important Notes

- ✅ `NEXT_PUBLIC_*` variables are exposed to the browser (this is safe for Apps Script URLs)
- ✅ Make sure your Apps Scripts are deployed with "Anyone" access
- ✅ The URLs must be the full Web App URL from Google Apps Script
- ⚠️ After adding variables, you MUST redeploy for them to take effect

## Testing

After redeploying:
1. Visit your live site
2. Try submitting the "Join Waitlist" form
3. Check your Google Sheet - the data should appear immediately!

## Troubleshooting

### Still seeing "Failed to connect"?
1. Verify the environment variables are set correctly in Vercel
2. Check that you redeployed after adding them
3. Verify your Apps Script URLs are correct
4. Make sure your Apps Scripts are deployed with "Anyone" access
5. Check the browser console for more detailed error messages

### "Configuration error" message?
- This means the environment variable isn't set at all
- Double-check the variable name matches exactly: `NEXT_PUBLIC_WAITLIST_SCRIPT_URL`
