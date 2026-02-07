# How to Get Your Web App URL (Not Library URL)

The URL you shared is a **library URL**, but we need a **Web App URL** for the forms to work.

## The Difference

- ❌ **Library URL** (what you have): `https://script.google.com/macros/library/d/SCRIPT_ID/VERSION`
- ✅ **Web App URL** (what you need): `https://script.google.com/macros/s/SCRIPT_ID/exec`

## Steps to Get the Web App URL

### Option 1: If You Already Deployed It

1. Go to [script.google.com](https://script.google.com)
2. Open your Contact form script project
3. Click **Deploy** → **Manage deployments**
4. You should see your deployment listed
5. Click the **copy icon** (📋) next to the **Web App URL**
6. That's the URL you need!

### Option 2: If You Haven't Deployed Yet

1. Go to [script.google.com](https://script.google.com)
2. Open your Contact form script project
3. Make sure your code is saved
4. Click **Deploy** → **New deployment**
5. Click the **gear icon** ⚙️ next to "Select type"
6. Choose **Web app**
7. Fill in:
   - **Description**: "Contact Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** (this is important!)
8. Click **Deploy**
9. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

## What to Do With the URL

Once you have the Web App URL:

1. Go to your **Vercel dashboard**
2. Go to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `NEXT_PUBLIC_CONTACT_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec` (paste your full URL)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your site (Deployments → ⋯ → Redeploy)

## Important Notes

- ✅ The URL must end with `/exec`
- ✅ The script must be deployed with "Anyone" access
- ✅ You need to redeploy Vercel after adding the environment variable
- ⚠️ Library URLs won't work - you need the Web App deployment URL

## Quick Check

Your URL should look like this:
```
https://script.google.com/macros/s/AKfycby123456789/exec
```

NOT like this:
```
https://script.google.com/macros/library/d/1i9VQSjHEKPZb86S09VLMVGg-Mdiawsr_NhwewHAks5rOpgAksvmflksl/1
```
