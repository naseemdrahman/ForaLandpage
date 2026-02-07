# Verify Your Apps Script Deployment

The script is still returning "Page Not Found" which means the deployment isn't working. Follow these steps:

## Step 1: Verify Script Code is Saved

1. Go to [script.google.com](https://script.google.com)
2. Open your script project
3. Make sure you see the `doPost` function in the code editor
4. Click **Save** (Ctrl+S or Cmd+S) to make sure it's saved

## Step 2: Check Deployment Settings

1. Click **Deploy** → **Manage deployments**
2. You should see your deployment listed
3. Click the **pencil icon** (Edit) to see settings
4. Verify:
   - **Execute as:** "Me (your-email)"
   - **Who has access:** Should be **"Anyone"** (not "Anyone within Fora")
5. If "Who has access" is wrong, change it and click **Deploy**

## Step 3: Create a NEW Deployment (if needed)

If editing doesn't work, create a fresh deployment:

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Choose **Web app**
4. Set:
   - **Description:** "Form Handler"
   - **Execute as:** "Me"
   - **Who has access:** **"Anyone"** (this is critical!)
5. Click **Deploy**
6. **Copy the NEW Web App URL**
7. Update your `.env.local` with the new URL

## Step 4: Verify Script Has doPost Function

Make sure your script code looks like this (starting with `function doPost`):

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    // ... rest of code
  }
}
```

**NOT** `function myFunction()` - it must be `function doPost(e)`

## Step 5: Test After Redeploying

After fixing the deployment, test with:
```bash
curl -L -X POST "YOUR_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","source":"waitlist-modal"}'
```

You should get: `{"ok":true}`

## Common Issues:

- ❌ Script not saved before deploying
- ❌ "Who has access" set to "Anyone within Fora" instead of "Anyone"
- ❌ Function named `myFunction` instead of `doPost`
- ❌ Old deployment being used instead of new one
