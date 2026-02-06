# Quick Start: Google Sheets Setup

Follow these steps in order to connect your forms to Google Sheets.

## Step 1: Install the Package (2 minutes)

Run this in your terminal:
```bash
npm install
```

This installs the Google Sheets library.

---

## Step 2: Create Your Google Sheet (3 minutes)

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it something like "FORA Submissions"
3. Create two tabs/sheets:
   - Tab 1: Name it **"Waitlist"**
   - Tab 2: Name it **"Contacts"**

4. Add headers in Row 1:

   **Waitlist tab:**
   ```
   A1: Timestamp
   B1: Name  
   C1: Email
   ```

   **Contacts tab:**
   ```
   A1: Timestamp
   B1: Name
   C2: Email
   D1: Message
   ```

5. **Copy the Sheet ID from the URL:**
   - Look at your browser URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit` - that's your Sheet ID
   - Save it somewhere - you'll need it later

---

## Step 3: Set Up Google Cloud Service Account (10 minutes)

### 3a. Create Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "New Project"
4. Name it "FORA" (or anything)
5. Click "Create"

### 3b. Enable Google Sheets API
1. In the search bar at the top, type "Google Sheets API"
2. Click on "Google Sheets API"
3. Click the blue "Enable" button

### 3c. Create Service Account
1. Click the hamburger menu (☰) in the top left
2. Go to "APIs & Services" > "Credentials"
3. Click "+ CREATE CREDENTIALS" at the top
4. Select "Service account"
5. Fill in:
   - **Service account name:** `fora-sheets`
   - Click "Create and Continue"
   - Click "Continue" (skip optional steps)
   - Click "Done"

### 3d. Create Key
1. Click on the service account you just created (should see `fora-sheets@...`)
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON"
5. Click "Create"
6. **A file will download** - save it somewhere safe! You'll need it in the next step.

---

## Step 4: Share Your Google Sheet (2 minutes)

1. Open the JSON file you just downloaded
2. Find the line that says `"client_email":` - copy that email (looks like `fora-sheets@your-project.iam.gserviceaccount.com`)
3. Go back to your Google Sheet
4. Click the green "Share" button (top right)
5. Paste the service account email
6. Make sure it has "Editor" permission
7. Uncheck "Notify people" (optional)
8. Click "Share"

---

## Step 5: Get Your Credentials (3 minutes)

Open the JSON file you downloaded. You need 3 things from it:

1. **Service Account Email:**
   - Find: `"client_email": "something@project.iam.gserviceaccount.com"`
   - Copy the email (without quotes)

2. **Private Key:**
   - Find: `"private_key": "-----BEGIN PRIVATE KEY-----\n..."`
   - Copy the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Keep all the `\n` characters

3. **Sheet ID:**
   - You already have this from Step 2

---

## Step 6: Create Environment File (2 minutes)

1. In your project folder, create a file called `.env.local`
2. Add this content (replace with YOUR values):

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email-from-json@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour entire private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_WAITLIST_SHEET_ID=your-sheet-id-from-url
GOOGLE_CONTACT_SHEET_ID=your-sheet-id-from-url
```

**Important:**
- Use the SAME Sheet ID for both (since you're using tabs)
- Keep the quotes around the private key
- Keep all the `\n` in the private key

---

## Step 7: Test It! (2 minutes)

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to your website and fill out the waitlist form
3. Check your Google Sheet - you should see a new row!
4. Fill out the contact form
5. Check the Contacts tab - another row should appear!

---

## Step 8: Deploy to Vercel (5 minutes)

1. Go to your Vercel project dashboard
2. Click "Settings" > "Environment Variables"
3. Add each variable one by one:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = (your service account email)
   - `GOOGLE_PRIVATE_KEY` = (your entire private key with quotes)
   - `GOOGLE_WAITLIST_SHEET_ID` = (your sheet ID)
   - `GOOGLE_CONTACT_SHEET_ID` = (your sheet ID)
4. Make sure to add them for "Production", "Preview", and "Development"
5. Click "Save"
6. Redeploy your site (or it will auto-deploy on next push)

---

## Troubleshooting

**"GOOGLE_WAITLIST_SHEET_ID not configured"**
- Make sure `.env.local` exists and has all 4 variables
- Restart your dev server after creating `.env.local`

**"Permission denied"**
- Make sure you shared the Google Sheet with the service account email
- The service account needs "Editor" permission

**Nothing appears in sheets**
- Check that sheet names are exactly "Waitlist" and "Contacts" (case-sensitive)
- Make sure headers are in row 1
- Check your terminal/console for error messages

---

## You're Done! 🎉

Now all form submissions will automatically appear in your Google Sheet. You can:
- View them in real-time
- Export to CSV
- Share with your team
- Create charts and filters
